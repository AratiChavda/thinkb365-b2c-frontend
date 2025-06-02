import { Outlet } from "react-router-dom";
import { AdminHeader } from "./header";
import { SidebarNav } from "./sidebarNav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider className="bg-gray-50">
      <SidebarNav />
      <SidebarInset>
        <AdminHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AdminLayout;
