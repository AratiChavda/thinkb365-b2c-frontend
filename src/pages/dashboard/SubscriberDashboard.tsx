// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   UsersIcon,
//   CreditCardIcon,
//   CalendarIcon,
//   TagIcon,
//   ArrowRightIcon,
//   ChartBarIcon,
//   ReceiptRefundIcon,
//   SparklesIcon,
//   BellIcon,
//   CubeIcon,
//   XCircleIcon,
//   CheckCircleIcon,
//   BoltIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Badge } from "@/components/ui/badge";

// export default function SubscriptionDashboard() {
//   const navigate = useNavigate();

//   // Mock data - replace with your API calls
//   const subscriptionData = {
//     activeCount: 3,
//     monthlySpend: "$49.97",
//     nextBilling: "Jun 15, 2023",
//     utilizationRate: "78%",
//     savingsPotential: "$12/month",
//   };

//   const activeSubscriptions = [
//     {
//       id: "sub_001",
//       name: "Premium Plan",
//       price: "$29.99/mo",
//       status: "active",
//       renewalDate: "Jun 15, 2023",
//       features: ["10 premium articles", "Ad-free", "4K streaming"],
//       utilization: "8/10 features used",
//       icon: <SparklesIcon className="h-6 w-6 text-purple-500" />,
//     },
//     {
//       id: "sub_002",
//       name: "Cloud Storage",
//       price: "$9.99/mo",
//       status: "active",
//       renewalDate: "Jun 10, 2023",
//       features: ["500GB storage", "File versioning"],
//       utilization: "45% used",
//       icon: <CubeIcon className="h-6 w-6 text-blue-500" />,
//     },
//     {
//       id: "sub_003",
//       name: "Music Pro",
//       price: "$9.99/mo",
//       status: "cancelled",
//       cancellationDate: "Ends on Jun 5, 2023",
//       features: ["Offline listening", "High quality audio"],
//       icon: <BoltIcon className="h-6 w-6 text-amber-500" />,
//     },
//   ];

//   const recommendations = [
//     {
//       id: "rec_001",
//       title: "Annual Plan",
//       description: "Save 15% with yearly billing",
//       action: "Switch to annual",
//       icon: <TagIcon className="h-5 w-5 text-green-500" />,
//     },
//     {
//       id: "rec_002",
//       title: "Family Plan",
//       description: "Share with 5 family members",
//       action: "Upgrade now",
//       icon: <UsersIcon className="h-5 w-5 text-indigo-500" />,
//     },
//   ];

//   const recentActivity = [
//     {
//       id: "act_001",
//       type: "payment",
//       description: "Monthly payment processed",
//       date: "May 15, 2023",
//       amount: "$49.97",
//     },
//     {
//       id: "act_002",
//       type: "cancellation",
//       description: "Music Pro cancellation requested",
//       date: "May 10, 2023",
//     },
//     {
//       id: "act_003",
//       type: "login",
//       description: "New device login detected",
//       date: "May 8, 2023",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-25 to-gray-100 p-4 md:p-8">
//       {/* Header */}
//       <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
//             My Subscriptions
//           </h1>
//           <p className="text-gray-600">
//             Manage your services and billing information
//           </p>
//         </div>
//         <div className="flex gap-3">
//           {/* <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => navigate("/add-subscription")}
//             className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-white shadow-lg shadow-purple-100 transition-all hover:shadow-xl"
//           >
//             <SparklesIcon className="h-5 w-5" />
//             <span>Add Service</span>
//           </motion.button> */}
//           <button
//             onClick={() => navigate("/dashboard/billing")}
//             className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm transition-all hover:bg-gray-50"
//           >
//             <CreditCardIcon className="h-5 w-5" />
//             <span>Billing</span>
//           </button>
//         </div>
//       </div>

//       {/* Metrics Grid */}
//       <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
//         <MetricCard
//           icon={<UsersIcon className="h-6 w-6 text-indigo-600" />}
//           title="Active Subscriptions"
//           value={subscriptionData.activeCount}
//           trend="+1 this month"
//           trendPositive={true}
//         />
//         <MetricCard
//           icon={<CreditCardIcon className="h-6 w-6 text-green-600" />}
//           title="Monthly Spend"
//           value={subscriptionData.monthlySpend}
//           trend="5% increase"
//           trendPositive={false}
//         />
//         <MetricCard
//           icon={<CalendarIcon className="h-6 w-6 text-amber-600" />}
//           title="Next Billing"
//           value={subscriptionData.nextBilling}
//           trend="3 days remaining"
//           trendPositive={false}
//         />
//         {/* <MetricCard
//           icon={<BoltIcon className="h-6 w-6 text-blue-600" />}
//           title="Utilization Rate"
//           value={subscriptionData.utilizationRate}
//           trend="High usage"
//           trendPositive={true}
//         /> */}
//       </div>

//       {/* Main Content */}
//       <div className="grid gap-6 md:grid-cols-3">
//         {/* Subscription List */}
//         <div className="md:col-span-2 space-y-6">
//           <Card className="overflow-hidden border border-gray-100 shadow-sm">
//             <CardHeader className="border-b border-gray-100 bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-lg font-semibold text-gray-900">
//                   Your Subscriptions
//                 </CardTitle>
//                 <button
//                   onClick={() => navigate("/dashboard/subscriptions")}
//                   className="flex items-center text-sm font-medium text-indigo-600"
//                 >
//                   View all <ArrowRightIcon className="ml-1 h-4 w-4" />
//                 </button>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0">
//               {activeSubscriptions.map((sub) => (
//                 <motion.div
//                   key={sub.id}
//                   whileHover={{ y: -2 }}
//                   onClick={() => navigate(`/subscription/${sub.id}`)}
//                   className="border-b border-gray-100 last:border-b-0"
//                 >
//                   <div className="flex cursor-pointer items-start justify-between p-4 transition-all hover:bg-gray-50">
//                     <div className="flex items-start gap-4">
//                       <div className="mt-1 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 p-2.5">
//                         {sub.icon}
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <h3 className="font-medium text-gray-900">
//                             {sub.name}
//                           </h3>
//                           {sub.status === "active" ? (
//                             <Badge className="flex items-center gap-1 bg-green-500">
//                               <CheckCircleIcon className="h-3 w-3" /> Active
//                             </Badge>
//                           ) : (
//                             <Badge
//                               variant="destructive"
//                               className="flex items-center gap-1"
//                             >
//                               <XCircleIcon className="h-3 w-3" /> Cancelled
//                             </Badge>
//                           )}
//                         </div>
//                         <p className="mt-1 text-sm text-gray-600">
//                           {sub.features.join(" • ")}
//                         </p>
//                         <div className="mt-2 flex items-center gap-3">
//                           <span className="text-sm font-medium text-gray-900">
//                             {sub.price}
//                           </span>
//                           {sub.status === "active" ? (
//                             <span className="text-xs text-gray-500">
//                               Renews on {sub.renewalDate}
//                             </span>
//                           ) : (
//                             <span className="text-xs text-gray-500">
//                               {sub.cancellationDate}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       {sub.status === "active" && sub.utilization && (
//                         <div className="mb-2">
//                           <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
//                             <div
//                               className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
//                               style={{ width: sub.utilization }}
//                             />
//                           </div>
//                           <p className="mt-1 text-xs text-gray-500">
//                             {sub.utilization}
//                           </p>
//                         </div>
//                       )}
//                       <ArrowRightIcon className="h-5 w-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Coming Soon - Usage Tracking */}
//           <Card className="border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-25 shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-gray-900">
//                 Usage Analytics
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="rounded-lg border border-dashed border-gray-200 bg-white p-8 text-center">
//                 <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-lg font-medium text-gray-900">
//                   Usage Tracking Coming Soon
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   We're working on detailed analytics to show how you're using
//                   each subscription.
//                 </p>
//                 <div className="mt-4 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
//                   In Development
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Sidebar */}
//         <div className="space-y-6">
//           {/* Recommendations */}
//           <Card className="border border-gray-100 shadow-sm">
//             <CardHeader className="border-b border-gray-100 bg-gray-50">
//               <CardTitle className="text-lg font-semibold text-gray-900">
//                 Recommendations
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               {recommendations.map((rec) => (
//                 <motion.div
//                   key={rec.id}
//                   whileHover={{ y: -2 }}
//                   className="border-b border-gray-100 last:border-b-0"
//                 >
//                   <div className="flex cursor-pointer items-start justify-between p-4 transition-all hover:bg-gray-50">
//                     <div className="flex items-start gap-3">
//                       <div className="mt-1 rounded-lg bg-gray-100 p-2">
//                         {rec.icon}
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-gray-900">
//                           {rec.title}
//                         </h3>
//                         <p className="mt-1 text-sm text-gray-600">
//                           {rec.description}
//                         </p>
//                       </div>
//                     </div>
//                     <button className="text-sm font-medium text-indigo-600">
//                       {rec.action}
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Recent Activity */}
//           <Card className="border border-gray-100 shadow-sm">
//             <CardHeader className="border-b border-gray-100 bg-gray-50">
//               <CardTitle className="text-lg font-semibold text-gray-900">
//                 Recent Activity
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               {recentActivity.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="border-b border-gray-100 px-4 py-3 last:border-b-0"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {activity.description}
//                       </p>
//                       <p className="mt-1 text-xs text-gray-500">
//                         {activity.date}
//                       </p>
//                     </div>
//                     {activity.amount && (
//                       <span className="text-sm font-medium text-gray-900">
//                         {activity.amount}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card className="border border-gray-100 shadow-sm">
//             <CardHeader className="border-b border-gray-100 bg-gray-50">
//               <CardTitle className="text-lg font-semibold text-gray-900">
//                 Quick Actions
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2 p-4">
//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/dashboard/payment-methods")}
//                 className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-lg bg-indigo-100 p-1.5">
//                     <CreditCardIcon className="h-5 w-5 text-indigo-600" />
//                   </div>
//                   <span className="font-medium text-gray-800">
//                     Payment Methods
//                   </span>
//                 </div>
//                 <ArrowRightIcon className="h-4 w-4 text-gray-400" />
//               </motion.button>

//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/invoices")}
//                 className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-lg bg-green-100 p-1.5">
//                     <ReceiptRefundIcon className="h-5 w-5 text-green-600" />
//                   </div>
//                   <span className="font-medium text-gray-800">
//                     View Invoices
//                   </span>
//                 </div>
//                 <ArrowRightIcon className="h-4 w-4 text-gray-400" />
//               </motion.button>

//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/notifications")}
//                 className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-lg bg-amber-100 p-1.5">
//                     <BellIcon className="h-5 w-5 text-amber-600" />
//                   </div>
//                   <span className="font-medium text-gray-800">
//                     Notification Settings
//                   </span>
//                 </div>
//                 <ArrowRightIcon className="h-4 w-4 text-gray-400" />
//               </motion.button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Metric Card Component
// const MetricCard = ({ icon, title, value, trend, trendPositive }: any) => (
//   <motion.div whileHover={{ y: -3 }}>
//     <Card className="h-full border border-gray-100 bg-white shadow-sm">
//       <CardContent className="p-5">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-gray-500">{title}</p>
//             <h3 className="mt-1 text-2xl font-bold text-gray-900">{value}</h3>
//           </div>
//           <div className="rounded-lg bg-gray-100 p-3">{icon}</div>
//         </div>
//         {trend && (
//           <p
//             className={`mt-2 flex items-center text-sm ${
//               trendPositive === true
//                 ? "text-green-600"
//                 : trendPositive === false
//                 ? "text-amber-600"
//                 : "text-gray-500"
//             }`}
//           >
//             {trend}
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   </motion.div>
// );
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Plus,
  UserPlus,
  Gift,
  CreditCard,
  Settings,
} from "lucide-react";

type Subscription = {
  id: string;
  name: string;
  type: "individual" | "family";
  price: string;
  features: string[];
  status: "active" | "pending" | "cancelled";
  members: FamilyMember[];
  maxMembers?: number;
  renewalDate: string;
  category: "entertainment" | "productivity" | "education" | "health";
};

type FamilyMember = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  isAdmin: boolean;
  assignedSubscriptions: string[];
};

export default function SubscriptionDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "subscriptions" | "members" | "billing"
  >("overview");
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      joinedDate: "Jan 15, 2023",
      isAdmin: true,
      assignedSubscriptions: ["sub1", "sub3"],
    },
    {
      id: "2",
      name: "Sam Wilson",
      email: "sam@example.com",
      joinedDate: "Feb 20, 2023",
      isAdmin: false,
      assignedSubscriptions: ["sub1", "sub2"],
    },
    {
      id: "3",
      name: "Taylor Smith",
      email: "taylor@example.com",
      joinedDate: "Mar 10, 2023",
      isAdmin: false,
      assignedSubscriptions: ["sub3"],
    },
  ]);

  const [subscriptions] = useState<Subscription[]>([
    {
      id: "sub1",
      name: "StreamMax Family",
      type: "family",
      price: "$14.99/month",
      features: ["6 screens at once", "4K HDR", "Kids profile"],
      status: "active",
      members: [],
      maxMembers: 6,
      renewalDate: "Jun 15, 2023",
      category: "entertainment",
    },
    {
      id: "sub2",
      name: "CloudPro Individual",
      type: "individual",
      price: "$9.99/month",
      features: ["1TB storage", "Advanced security", "Priority support"],
      status: "active",
      members: [],
      renewalDate: "Jul 1, 2023",
      category: "productivity",
    },
    {
      id: "sub3",
      name: "LearnHub Family",
      type: "family",
      price: "$19.99/month",
      features: ["Unlimited courses", "Certificates", "5 family members"],
      status: "active",
      members: [],
      maxMembers: 5,
      renewalDate: "Jun 20, 2023",
      category: "education",
    },
    {
      id: "sub4",
      name: "FitLife Premium",
      type: "individual",
      price: "$12.99/month",
      features: ["Personal trainer", "Meal plans", "Health tracking"],
      status: "pending",
      members: [],
      renewalDate: "Jun 5, 2023",
      category: "health",
    },
  ]);

  // const [billingHistory] = useState([
  //   {
  //     id: "1",
  //     date: "May 15, 2023",
  //     amount: "$44.97",
  //     status: "paid",
  //     invoice: "INV-2023-05-001",
  //   },
  //   {
  //     id: "2",
  //     date: "Apr 15, 2023",
  //     amount: "$44.97",
  //     status: "paid",
  //     invoice: "INV-2023-04-001",
  //   },
  //   {
  //     id: "3",
  //     date: "Mar 15, 2023",
  //     amount: "$34.98",
  //     status: "paid",
  //     invoice: "INV-2023-03-001",
  //   },
  // ]);

  const [loyaltyPoints] = useState(1850);
  const [nextReward] = useState(2000);
  const [savingsThisMonth] = useState(15.5);
  const [totalMonthlyCost] = useState(44.97);

  // Calculate subscription usage
  const calculateSubscriptionUsage = (subId: string) => {
    const sub = subscriptions.find((s) => s.id === subId);
    if (!sub || sub.type === "individual") return 0;
    const memberCount = members.filter((m) =>
      m.assignedSubscriptions.includes(subId)
    ).length;
    return sub.maxMembers ? (memberCount / sub.maxMembers) * 100 : 0;
  };

  // Add new member
  // const addMember = (member: Omit<FamilyMember, "id">) => {
  //   setMembers([
  //     ...members,
  //     {
  //       ...member,
  //       id: Math.random().toString(36).substring(2, 9),
  //       isAdmin: false,
  //       assignedSubscriptions: [],
  //     },
  //   ]);
  // };

  // Assign subscription to member
  const assignSubscription = (memberId: string, subId: string) => {
    setMembers(
      members.map((member) => {
        if (member.id === memberId) {
          const newSubs = member.assignedSubscriptions.includes(subId)
            ? member.assignedSubscriptions.filter((id) => id !== subId)
            : [...member.assignedSubscriptions, subId];
          return { ...member, assignedSubscriptions: newSubs };
        }
        return member;
      })
    );
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "entertainment":
        return "🎬";
      case "productivity":
        return "💼";
      case "education":
        return "🎓";
      case "health":
        return "❤️";
      default:
        return "📌";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with quick actions */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Subscription Hub
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all your subscriptions in one place
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Gift className="h-4 w-4" />
              Gift Subscription
            </Button>
          </div>
        </motion.header>

        {/* Navigation Tabs */}
        <motion.div
          className="flex space-x-4 mb-8 overflow-x-auto pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {[
            {
              id: "overview",
              label: "Overview",
              icon: <Settings className="h-4 w-4 mr-2" />,
            },
            {
              id: "subscriptions",
              label: "Subscriptions",
              icon: <CreditCard className="h-4 w-4 mr-2" />,
            },
            {
              id: "members",
              label: "Members",
              icon: <UserPlus className="h-4 w-4 mr-2" />,
            },
            {
              id: "billing",
              label: "Billing",
              icon: <CreditCard className="h-4 w-4 mr-2" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Subscriptions */}
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardHeader className="pb-2">
                      <CardDescription>Total Subscriptions</CardDescription>
                      <CardTitle className="text-4xl">
                        {subscriptions.length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        {
                          subscriptions.filter((s) => s.status === "active")
                            .length
                        }{" "}
                        active
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Monthly Cost */}
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-green-50 to-teal-50">
                    <CardHeader className="pb-2">
                      <CardDescription>Monthly Cost</CardDescription>
                      <CardTitle className="text-4xl">
                        ${totalMonthlyCost}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        ${savingsThisMonth} saved this month
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Family Members */}
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardHeader className="pb-2">
                      <CardDescription>Family Members</CardDescription>
                      <CardTitle className="text-4xl">
                        {members.length}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        {members.filter((m) => m.isAdmin).length} admins
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Loyalty Points */}
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardHeader className="pb-2">
                      <CardDescription>Loyalty Points</CardDescription>
                      <CardTitle className="text-4xl">
                        {loyaltyPoints}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        {nextReward - loyaltyPoints} to next reward
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Active Subscriptions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Active Subscriptions</CardTitle>
                    <CardDescription>
                      Your currently active subscription services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subscriptions
                        .filter((s) => s.status === "active")
                        .map((sub) => (
                          <Card
                            key={sub.id}
                            className="relative overflow-hidden"
                          >
                            <div
                              className={`absolute top-0 right-0 px-2 py-1 text-xs font-medium ${
                                sub.type === "family"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {sub.type === "family" ? "FAMILY" : "INDIVIDUAL"}
                            </div>
                            <CardHeader>
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">
                                  {getCategoryIcon(sub.category)}
                                </span>
                                <div>
                                  <CardTitle className="text-lg">
                                    {sub.name}
                                  </CardTitle>
                                  <CardDescription>{sub.price}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm">
                                {sub.features.slice(0, 3).map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <svg
                                      className="h-4 w-4 text-green-500 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              {sub.type === "family" && (
                                <div className="mt-4">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Members</span>
                                    <span>
                                      {
                                        members.filter((m) =>
                                          m.assignedSubscriptions.includes(
                                            sub.id
                                          )
                                        ).length
                                      }
                                      /{sub.maxMembers}
                                    </span>
                                  </div>
                                  <Progress
                                    value={calculateSubscriptionUsage(sub.id)}
                                    className="h-2"
                                  />
                                </div>
                              )}
                            </CardContent>
                            <CardFooter>
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setActiveTab("subscriptions")}
                              >
                                Manage
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Renewals */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>Upcoming Renewals</CardTitle>
                      <CardDescription>
                        Subscriptions renewing soon
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {subscriptions
                          .filter((s) => s.status === "active")
                          .sort(
                            (a, b) =>
                              new Date(a.renewalDate).getTime() -
                              new Date(b.renewalDate).getTime()
                          )
                          .slice(0, 3)
                          .map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-center justify-between"
                            >
                              <div>
                                <p className="font-medium">{sub.name}</p>
                                <p className="text-sm text-gray-500">
                                  {sub.renewalDate}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {sub.price.split("/")[0]}
                                </p>
                                <Badge variant="outline">{sub.type}</Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => setActiveTab("subscriptions")}
                      >
                        View All
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Family Members */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>Family Members</CardTitle>
                      <CardDescription>
                        {members.length} people in your family
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {members.slice(0, 3).map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center space-x-3"
                          >
                            <Avatar>
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-500">
                                {member.assignedSubscriptions.length}{" "}
                                subscriptions
                              </p>
                            </div>
                            {member.isAdmin && (
                              <Badge variant="outline">Admin</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => setActiveTab("members")}
                      >
                        Manage Members
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Loyalty Rewards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-indigo-50 to-purple-50">
                    <CardHeader>
                      <CardTitle>Loyalty Rewards</CardTitle>
                      <CardDescription>
                        {nextReward - loyaltyPoints} points to next reward
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Your Points</span>
                          <span className="font-bold text-indigo-600">
                            {loyaltyPoints}/{nextReward}
                          </span>
                        </div>
                        <Progress
                          value={(loyaltyPoints / nextReward) * 100}
                          className="h-2 bg-indigo-100"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500">Current</div>
                          <div className="font-bold">Silver</div>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500">Next</div>
                          <div className="font-bold text-yellow-600">Gold</div>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500">At 3000</div>
                          <div className="font-bold text-purple-600">
                            Platinum
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-indigo-200 text-indigo-600"
                      >
                        View Rewards
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <motion.div
              key="subscriptions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Subscriptions
                  </h2>
                  <p className="text-gray-600">
                    Manage all your subscription services
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Subscription
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Subscription</DialogTitle>
                      <DialogDescription>
                        Enter details of your new subscription service
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Service Name</Label>
                        <Input id="name" placeholder="e.g. MusicStream Pro" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price">Monthly Price</Label>
                        <Input id="price" placeholder="$0.00" type="number" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Subscription Type</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="individual" />
                            <Label htmlFor="individual">Individual</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="family" />
                            <Label htmlFor="family">Family</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Subscription</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <Card
                    key={sub.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">
                            {getCategoryIcon(sub.category)}
                          </span>
                          <div>
                            <CardTitle>{sub.name}</CardTitle>
                            <CardDescription>
                              {sub.price} •{" "}
                              {sub.type === "family"
                                ? `${
                                    members.filter((m) =>
                                      m.assignedSubscriptions.includes(sub.id)
                                    ).length
                                  }/${sub.maxMembers} members`
                                : "Individual plan"}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={
                            sub.status === "active" ? "default" : "outline"
                          }
                        >
                          {sub.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-medium mb-2">Features</h3>
                          <ul className="space-y-2">
                            {sub.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Details</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Renewal Date
                              </span>
                              <span>{sub.renewalDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Type</span>
                              <span className="capitalize">{sub.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Category</span>
                              <span className="capitalize">{sub.category}</span>
                            </div>
                          </div>
                        </div>
                        {sub.type === "family" && (
                          <div>
                            <h3 className="font-medium mb-2">
                              Assigned Members
                            </h3>
                            {members.filter((m) =>
                              m.assignedSubscriptions.includes(sub.id)
                            ).length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {members
                                  .filter((m) =>
                                    m.assignedSubscriptions.includes(sub.id)
                                  )
                                  .map((member) => (
                                    <Avatar key={member.id}>
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback>
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">
                                No members assigned
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex space-x-2">
                        <Button variant="outline">Edit</Button>
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="default">
                            {sub.type === "family"
                              ? "Manage Members"
                              : "Change Plan"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {sub.type === "family"
                                ? "Assign Family Members"
                                : "Change Plan"}
                            </DialogTitle>
                            <DialogDescription>
                              {sub.type === "family"
                                ? "Select which family members can access this subscription"
                                : "Upgrade or downgrade your plan"}
                            </DialogDescription>
                          </DialogHeader>
                          {sub.type === "family" ? (
                            <div className="space-y-4">
                              {members.map((member) => (
                                <div
                                  key={member.id}
                                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Avatar>
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback>
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">
                                        {member.name}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        {member.email}
                                      </p>
                                    </div>
                                  </div>
                                  <Switch
                                    checked={member.assignedSubscriptions.includes(
                                      sub.id
                                    )}
                                    onCheckedChange={() =>
                                      assignSubscription(member.id, sub.id)
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <p>Plan upgrade options would appear here</p>
                            </div>
                          )}
                          <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Members Tab */}
          {activeTab === "members" && (
            <motion.div
              key="members"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Family Members
                  </h2>
                  <p className="text-gray-600">
                    Manage who has access to your family subscriptions
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Family Member</DialogTitle>
                      <DialogDescription>
                        Invite someone to join your family plan
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="admin" />
                        <Label htmlFor="admin">Make admin</Label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button
                      //  onClick={() => addMember({
                      //   name: "New Member", // Replace with form data
                      //   email: "new@example.com", // Replace with form data
                      //   joinedDate: new Date().toLocaleDateString('en-US', {
                      //     year: 'numeric', month: 'short', day: 'numeric'
                      //   }),
                      //   isAdmin: false, // Replace with form data
                      // })}
                      >
                        Add Member
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Subscriptions</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{member.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.joinedDate}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {member.assignedSubscriptions
                                .slice(0, 2)
                                .map((subId) => {
                                  const sub = subscriptions.find(
                                    (s) => s.id === subId
                                  );
                                  return sub ? (
                                    <Badge
                                      key={subId}
                                      variant="outline"
                                      className="text-xs truncate max-w-[80px]"
                                    >
                                      {sub.name}
                                    </Badge>
                                  ) : null;
                                })}
                              {member.assignedSubscriptions.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{member.assignedSubscriptions.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`admin-${member.id}`}
                                checked={member.isAdmin}
                                onCheckedChange={() => toggleAdmin(member.id)}
                              />
                              <Label htmlFor={`admin-${member.id}`}>
                                {member.isAdmin ? "Admin" : "Member"}
                              </Label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => {
                                    // Open member edit dialog
                                  }}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  // onClick={() => removeFamilyMember(member.id)}
                                >
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">
                      Family Plan Management
                    </h3>
                    <p className="text-sm text-blue-600 mt-1">
                      Admins can manage billing and members. Members have full
                      access to content but cannot change subscription settings.
                      You can assign
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
