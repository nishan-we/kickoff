import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useRef } from "react";
import { type Backend, createActor } from "../backend";

const env = (import.meta as unknown as { env: Record<string, string> }).env;
const USE_MOCK = env.VITE_USE_MOCK === "true";
const CANISTER_ID = env.VITE_CANISTER_ID_BACKEND ?? "";

// No-op file handlers (no object storage in use)
async function uploadFile(): Promise<Uint8Array> {
  throw new Error("File upload not supported");
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function downloadFile(): Promise<any> {
  throw new Error("File download not supported");
}

async function getMockBackend(): Promise<Backend> {
  const { mockBackend } = await import("../mocks/backend");
  return mockBackend as unknown as Backend;
}

let _anonymousActor: Backend | null = null;

export function getAnonymousActor(): Backend {
  if (USE_MOCK) {
    if (!_anonymousActor) {
      // Return a proxy that lazily resolves mock methods
      let mockResolved: Backend | null = null;
      getMockBackend().then((m) => {
        mockResolved = m;
      });
      _anonymousActor = new Proxy({} as Backend, {
        get(_target, prop) {
          if (mockResolved) {
            const fn = (mockResolved as unknown as Record<string, unknown>)[
              prop as string
            ];
            if (typeof fn === "function") return fn.bind(mockResolved);
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (...args: any[]) =>
            getMockBackend().then((m) => {
              const fn = (m as unknown as Record<string, unknown>)[
                prop as string
              ];
              if (typeof fn === "function")
                return (fn as (...a: unknown[]) => unknown).apply(m, args);
            });
        },
      });
    }
    return _anonymousActor;
  }
  if (!_anonymousActor) {
    _anonymousActor = createActor(CANISTER_ID, uploadFile, downloadFile);
  }
  return _anonymousActor;
}

export function useActor(): { actor: Backend | null; isFetching: boolean } {
  const { identity, loginStatus } = useInternetIdentity();
  const actorRef = useRef<Backend | null>(null);
  const prevIdentityRef = useRef<typeof identity>(undefined);

  const isFetching = loginStatus === "logging-in";

  if (USE_MOCK) {
    if (!actorRef.current) {
      actorRef.current = getAnonymousActor();
    }
    return { actor: actorRef.current, isFetching: false };
  }

  if (identity !== prevIdentityRef.current) {
    prevIdentityRef.current = identity;
    if (identity) {
      actorRef.current = createActor(CANISTER_ID, uploadFile, downloadFile, {
        agentOptions: { identity },
      });
    } else {
      actorRef.current = getAnonymousActor();
    }
  }

  if (!actorRef.current) {
    actorRef.current = getAnonymousActor();
  }

  return { actor: actorRef.current, isFetching };
}
