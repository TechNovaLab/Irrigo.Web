export type SnackbarType = "success" | "error" | "warning";

export interface SnackbarProps {
  message: string;
  type: SnackbarType;
  linkText?: string;
  onLinkClick?: () => void;
} 