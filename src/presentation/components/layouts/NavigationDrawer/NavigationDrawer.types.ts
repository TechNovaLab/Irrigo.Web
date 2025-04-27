import { ReactNode, FC } from "react";

export interface NavigationLinkProps {
  href: string;
  label: string;
  Icon?: FC;
  className?: string;
}

export interface NavigationGroupProps {
  children: ReactNode;
  label: string;
  groupId: string;
  defaultExpanded?: boolean;
  Icon?: FC;
  className?: string;
}

export interface NavigationDrawerProps {
  className?: string;
  user?: {
    firstName: string;
    lastName: string;
    roleName: string;
  };
} 