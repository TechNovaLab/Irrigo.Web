import { Avatar } from "@/presentation/components/ui/Avatar";
import { ChartIcon, LeafIcon } from "@/presentation/components/ui/Icon";
import NavigationLink from "@/presentation/components/layouts/NavigationDrawer/NavigationLink";
import NavigationGroup from "@/presentation/components/layouts/NavigationDrawer/NavigationGroup";
import { DropdownProvider } from "@/presentation/contexts/dropdown/DropdownContext";
import { NavigationDrawerProps } from "@/presentation/components/layouts/NavigationDrawer/NavigationDrawer.types";

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ className = "", user }) => {
  return (
    <aside
      id="navigation-drawer"
      className={`flex flex-col top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${className}`}
      aria-label="Navigation Drawer"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-[#1f1633] dark:bg-[#1f1633]">
        {user && (
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            roleName={user.roleName}
          />
        )}
        <ul className="space-y-2 font-medium">
          <NavigationLink href="/main" label="Estadísticas" Icon={ChartIcon} />
          <li>
            <DropdownProvider>
              <NavigationGroup label="Riegos" Icon={LeafIcon} groupId="riegos">
                <NavigationLink href="#" label="· Cultivos" />
                <NavigationLink href="#" label="· Jardineras" />
                <NavigationLink href="#" label="· Aspersores" />
              </NavigationGroup>
            </DropdownProvider>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default NavigationDrawer; 