
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
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

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
            <p className="text-green-100 text-xs">Smart Fertilizer Tracking</p>
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
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
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
              Smart RFID-based Fertilizer Supply Chain Management System
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
