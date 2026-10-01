import { LucideIcon } from "lucide-react";
import React from "react";

export type ThemeColor = "cyan" | "blue" | "emerald" | "amber" | "violet" | "rose";

export interface SceneCta {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
  isWhatsApp?: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export interface SceneStat {
  value: string;
  label: string;
  sub?: string;
}

export interface HudTelemetry {
  nodeId: string;
  protocol: string;
  sector: string;
  securityLevel: string;
  coordinates?: string;
}

export interface CinematicSceneConfig {
  id: string;
  route: string;
  name: string;
  badge: string;
  badgeIcon?: LucideIcon;
  badgeSystemCode?: string;
  title: string;
  titleHighlight: string;
  titleAfter?: string;
  description: string;
  themeColor: ThemeColor;
  primaryCta?: SceneCta;
  secondaryCta?: SceneCta;
  stats?: SceneStat[];
  videoDesktop?: string | null;
  videoMobile?: string | null;
  posterDesktop?: string;
  posterMobile?: string;
  ambientGlows: {
    primary: string;
    secondary: string;
  };
  hudTelemetry: HudTelemetry;
  sceneTag: string;
  alignment?: "center" | "left";
}

export interface CinematicHeroProps {
  scene: CinematicSceneConfig;
  className?: string;
  children?: React.ReactNode;
  showScrollIndicator?: boolean;
  onScrollToContent?: () => void;
  overrideTitle?: React.ReactNode;
  overrideDescription?: React.ReactNode;
  customActions?: React.ReactNode;
}

export interface CinematicOverlayProps {
  themeColor?: ThemeColor;
  telemetry?: HudTelemetry;
  badge?: string;
  className?: string;
}

export interface CinematicSceneProps {
  scene: CinematicSceneConfig;
  className?: string;
  isMobile?: boolean;
}
