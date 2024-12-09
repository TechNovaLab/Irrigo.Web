import { Avatar } from "@/components/Avatar";
import { ChartIcon, LeafIcon } from "@/components/Icon";
import SidebarLink from "./SidebarLink";
import SidebarGroup from "./SidebarGroup";
import { DropdownProvider } from "@/contexts/dropdown/DropdownContext";

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="flex flex-col top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-[#1f1633] dark:bg-[#1f1633]">
        <Avatar firstName="Luis" lastName="Rodriguez" roleName="Member" />
        <ul className="space-y-2 font-medium">
          <SidebarLink href="/main" label="Estadísticas" Icon={ChartIcon} />
          <li>
            <DropdownProvider>
              <SidebarGroup label="Riegos" Icon={LeafIcon} groupId="riegos">
                <SidebarLink href="#" label="· Cultivos" />
                <SidebarLink href="#" label="· Jardineras" />
                <SidebarLink href="#" label="· Aspersores" />
              </SidebarGroup>
            </DropdownProvider>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
