import { Outlet } from "react-router-dom";
import { HouseHoldHeader } from "./header";

const HouseHoldLayout = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-x-hidden overflow-y-auto">
      <HouseHoldHeader />
      <main className="mt-14">
        <Outlet />
      </main>
    </div>
  );
};
export default HouseHoldLayout;
