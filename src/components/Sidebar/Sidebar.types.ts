export interface SidebarLinkProps {
  href: string;
  label: string;
  Icon?: React.FC;
}

export interface SidebarGroupProps {
  children: React.ReactNode;
  label: string;
  groupId: string;
  defaultExpanded?: boolean;
  Icon?: React.FC;
}
