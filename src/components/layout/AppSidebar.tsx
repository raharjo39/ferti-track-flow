
import { Database, Map, Scan, MapPinCheck, Smartphone } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Database,
  },
  {
    title: "Warehouse",
    path: "/warehouse",
    icon: Scan,
  },
  {
    title: "Field Site",
    path: "/field-site",
    icon: MapPinCheck,
  },
  {
    title: "Farmer App",
    path: "/farmer-app",
    icon: Smartphone,
  },
  {
    title: "Tracking Map",
    path: "/tracking",
    icon: Map,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <div className="flex items-center space-x-2 px-4">
          <div className="bg-white rounded-lg p-1">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              FT
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">FertiTrack</h2>
            <p className="text-green-100 text-xs">ASIX Indonesia Cerdas</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="pb-4">
        <div className="px-4">
          <div className="bg-sidebar-accent p-3 rounded-md">
            <p className="text-sidebar-accent-foreground text-xs">
              Sistem Manajemen Rantai Pasok Pupuk Berbasis RFID
            </p>
          </div>
        </div>
      </SidebarFooter>
      
      <SidebarTrigger className="absolute top-4 right-2 bg-green-600 text-white" />
    </Sidebar>
  );
};

export default AppSidebar;
