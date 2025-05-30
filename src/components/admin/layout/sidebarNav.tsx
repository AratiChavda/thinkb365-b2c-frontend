import { Icons } from "@/components/icons";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Icons.dashboard className="h-5 w-5" />,
  },
  {
    title: "Brands",
    href: "/dashboard/brands",
    icon: <Icons.brand className="h-5 w-5" />,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: <Icons.category className="h-5 w-5" />,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: <Icons.product className="h-5 w-5" />,
  },
  {
    title: "Offers",
    href: "/dashboard/offers",
    icon: <Icons.offer className="h-5 w-5" />,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscriptions",
    icon: <Icons.subscription className="h-5 w-5" />,
  },
  // {
  //   title: "Billing",
  //   href: "/dashboard/billing",
  //   icon: <Icons.billing className="h-5 w-5" />,
  // },
  {
    title: "Add-ons",
    href: "/dashboard/add-ons",
    icon: <Icons.addOn className="h-5 w-5" />,
  },
  {
    title: "Promotions",
    href: "/dashboard/promotions",
    icon: <Icons.promotions className="h-5 w-5" />,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <Icons.users className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <Icons.reports className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Icons.settings className="h-5 w-5" />,
  },
];

export function SidebarNav() {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  return (
    <div className="hidden min-h-screen sticky w-64 border-r bg-white md:block">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BookOpen className="h-6 w-6 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
            </motion.div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Think365
            </motion.span>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
