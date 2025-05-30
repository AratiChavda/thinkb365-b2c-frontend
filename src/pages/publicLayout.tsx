import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col min-h-screen pt-[64px]">
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default PublicLayout;
