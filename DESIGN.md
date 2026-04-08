# Design Brief — Football Tournament Manager

## Purpose
Professional sports league dashboard enabling tournament organizers to edit scores, manage players, configure match formats, and view standings. Users access via responsive web/mobile interface with read-only mode support.

## Visual Direction
Broadcast-quality scoreboard meets editorial briefing dashboard. Authoritative, professional, moment-driven — high stakes visualized through color and depth layering. Clean grid systems with purposeful accent color for live matches, goals, and league leaders.

## Tone
Elite football aesthetic without corporate sterility. Sharp typography hierarchies, reserved restraint, decisive moments highlighted through color and elevation.

## Color Palette

| Token | OKLCH | Usage |
|-------|-------|-------|
| Primary | `0.32 0.09 264` (navy) | Headers, navigation, authority |
| Secondary | `0.52 0.22 142` (emerald) | Goals, team success, data highlights |
| Accent | `0.68 0.25 62` (gold) | Live fixtures, standings leaders, active states |
| Destructive | `0.55 0.22 25` (red) | Red cards, cancellations, errors |
| Neutral | `0.96/0.16 0 0` (light/dark grey) | Backgrounds, surfaces |

Dark mode: Primary `0.75 0.12 264`, Secondary `0.62 0.24 142`, Accent `0.72 0.28 62`.

## Typography
- **Display**: General Sans (geometric, bold, team names/scores)
- **Body**: Inter (precise, legible, player lists/standings)
- **Mono**: JetBrains Mono (timestamps, statistics, fixture codes)

## Elevation & Depth
- **Card base**: `shadow-xs` for subtle depth
- **Fixture cards (live)**: `shadow-fixture` (4px, 8% opacity)
- **Modal/overlay**: `shadow-elevated` (8px, 12% opacity)
- **Accent accent borders** on active/live fixtures

## Structural Zones

| Zone | Background | Treatment | Rhythm |
|------|------------|-----------|--------|
| Header/Nav | Primary navy | Solid, `border-b` (subtle border) | Dense padding |
| Live Fixture Cards | Card base | Elevated shadow, accent border on live | Generous vertical spacing |
| Standings Tables | Alternating `bg-card`/`bg-muted/30` | Grid-aligned, subtle dividers | Compact rows |
| Player Roster | `bg-muted/10` sections | Individual cards, number badges | Flexible grid |
| Footer | `bg-muted/5` | Minimal, light border-top | Spacious padding |

## Component Patterns
- **Match fixture**: Large score typography (display font), team names, status badge (`badge-live` for active)
- **Standings row**: Team name + logo placeholder, goals-for/against, points (bold accent on leader)
- **Player card**: Squad number overlay, role badge, name/position
- **Read-only mode**: UI disabled but fully visible; muted accent tones

## Motion
- Smooth transitions on interactive elements (`transition-smooth`)
- Live match pulse: `animate-pulse-subtle` (2s loop, gentle breathing effect)
- No bounce; focus on broadcast clarity

## Constraints
- Minimum 48px tap targets on mobile
- High contrast: AA+ compliance for all foreground-background pairs
- No decorative gradients; use solid colors with shadow depth
- Tight `rounded-sm` (4px) for grid alignment
- Reserved use of accent: only for active/highlighted states

## Signature Detail
Live match card with accent border + subtle pulse animation + large score typography + team positioning mirrors broadcast scoreboard design.
