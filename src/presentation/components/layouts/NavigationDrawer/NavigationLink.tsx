import Link from "next/link";
import { NavigationLinkProps } from "@/presentation/components/layouts/NavigationDrawer/NavigationDrawer.types";

const NavigationLink: React.FC<NavigationLinkProps> = ({ href, label, Icon, className = "" }) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-2 text-gray-900 rounded dark:text-white hover:bg-gray-100/20 dark:hover:bg-gray-700/20 group ${className}`}
      >
        {Icon && <Icon />}
        <span className="ms-3">{label}</span>
      </Link>
    </li>
  );
};

export default NavigationLink; 