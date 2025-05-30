import AdminDashboard from "./AdminDashboard";
import SubscriberDashboard from "./SubscriberDashboard";
// import HouseholdDashboard from "./HouseholdDashboard";
// import { useSelector } from "react-redux";

export default function Dashboard() {
  // const role = useSelector((state: any) => state.auth?.user?.role);
  const role: any = JSON.parse(localStorage.getItem("user") || "{}")?.role;
  switch (role) {
    case "administrator":
      return <AdminDashboard />;
    case "household_subscriber":
      return <SubscriberDashboard />;
    case "SUBSCRIBER":
      return <SubscriberDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
}
