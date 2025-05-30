
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 relative flex flex-col">
          <div className="sticky top-0 z-40 bg-background border-b p-2">
            <SidebarTrigger className="bg-green-600 text-white hover:bg-green-700" />
          </div>
          <main className="container p-4 md:p-6 max-w-7xl flex-grow">
            {children}
          </main>
          <AppFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
