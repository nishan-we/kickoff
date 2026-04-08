import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Calendar,
  type LucideIcon,
  Trophy,
  Users,
} from "lucide-react";

interface EmptyStateProps {
  icon?: "trophy" | "users" | "calendar" | "chart";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  "data-ocid"?: string;
}

const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  users: Users,
  calendar: Calendar,
  chart: BarChart2,
};

export function EmptyState({
  icon = "trophy",
  title,
  description,
  actionLabel,
  onAction,
  "data-ocid": dataOcid,
}: EmptyStateProps) {
  const Icon = iconMap[icon];

  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      data-ocid={dataOcid}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" aria-hidden />
      </div>
      <h3 className="mb-2 text-lg font-display font-semibold text-foreground">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          data-ocid={dataOcid ? `${dataOcid}-cta` : undefined}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
