import { useDropdown } from "@/presentation/contexts/dropdown/DropdownContext";
import { NavigationGroupProps } from "@/presentation/components/layouts/NavigationDrawer/NavigationDrawer.types";
import { AngleDownIcon } from "@/presentation/components/ui/Icon";

const NavigationGroup: React.FC<NavigationGroupProps> = ({
  children,
  label,
  groupId,
  defaultExpanded = false,
  Icon,
  className = "",
}) => {
  const { expandedGroups, toggleGroup } = useDropdown();
  const isExpanded = expandedGroups.has(groupId) || defaultExpanded;
  const handleToggle = () => {
    toggleGroup(groupId);
  };

  return (
    <>
      <button
        type="button"
        className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded hover:bg-gray-100/20 dark:text-white dark:hover:bg-gray-700/20 group ${className}`}
        aria-controls={`dropdown-${groupId}`}
        aria-expanded={isExpanded}
        onClick={handleToggle}
      >
        {Icon && <Icon />}
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {label}
        </span>
        <AngleDownIcon
          cssStyle={`${isExpanded ? "rotate-180" : ""} transition-transform`}
        />
      </button>
      <ul
        id={`dropdown-${groupId}`}
        className={`${isExpanded ? "block" : "hidden"} py-1 space-y-1`}
      >
        {children}
      </ul>
    </>
  );
};

export default NavigationGroup; 