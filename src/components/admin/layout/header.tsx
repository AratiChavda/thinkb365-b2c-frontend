import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { User, Bookmark, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { adminNavItems } from "./adminNavItems";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = JSON.parse(localStorage.getItem("user") || "{}")?.name;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const generateBreadcrumbs = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const match = adminNavItems.find((item) => item.url === currentPath);
      if (match) breadcrumbs.push(match);
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center py-1 gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={item.url}>
                <BreadcrumbLink
                  href={item.url}
                  className="flex items-center gap-1"
                >
                  <span>{item.title}</span>
                </BreadcrumbLink>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="size-8 cursor-pointer border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
                  <AvatarImage src="/images/avatar.jpg" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                    {userName
                      ?.split(" ")
                      .map((word: string) => word[0].toUpperCase())
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 shadow-xl rounded-xl border border-gray-100">
              <DropdownMenuLabel className="gap-2 cursor-pointer">
                <span className="ml-2">{userName}</span>
                <Separator orientation="horizontal" className="my-2" />
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="gap-2 cursor-pointer"
              >
                <User className="h-4 w-4 text-gray-500" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/dashboard")}
                className="gap-2 cursor-pointer"
              >
                <Home className="h-4 w-4 text-gray-500" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/subscriptions")}
                className="gap-2 cursor-pointer"
              >
                <Bookmark className="h-4 w-4 text-gray-500" />
                <span>Subscriptions</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-100" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="gap-2 cursor-pointer text-red-500 hover:!text-red-600 focus:!text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
