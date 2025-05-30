import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { User, Bookmark, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.div
      className={
        "fixed top-0 left-64 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm py-2"
      }
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer group"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="cursor-pointer border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
                <AvatarImage src="/images/avatar.jpg" />
                <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                  AC
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 shadow-xl rounded-xl border border-gray-100">
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
    </motion.div>
  );
};
