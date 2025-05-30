import { Outlet } from "react-router-dom";
import { AdminHeader } from "./header";
import { SidebarNav } from "./sidebarNav";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <AdminHeader />
        <main className="p-6 mt-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
