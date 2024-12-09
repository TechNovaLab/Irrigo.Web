import Link from "next/link";
import { SidebarLinkProps } from "./Sidebar.types";

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, label, Icon }) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-2 text-gray-900 rounded dark:text-white hover:bg-gray-100/20 dark:hover:bg-gray-700/20 group"
      >
        {Icon && <Icon />}
        <span className="ms-3">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
