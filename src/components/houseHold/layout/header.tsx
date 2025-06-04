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

export const HouseHoldHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.div
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm py-2"
      }
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/News_Corp_logo_2013.svg"
              className="h-8 mt-2 w-full"
            />
            {/* <BookOpen className="h-6 w-6 text-primary-600 group-hover:text-primary-700 transition-colors" /> */}
          </motion.div>
          <motion.span
            className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            - FSS
          </motion.span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="cursor-pointer border-2 border-primary-100 hover:border-primary-200 transition-colors">
                <AvatarImage src="/images/avatar.jpg" />
                <AvatarFallback className="bg-primary-100 text-primary-600 font-medium">
                  EJ
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
