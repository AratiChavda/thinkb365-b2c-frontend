import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Menu,
  X,
  ChevronDown,
  User,
  Bookmark,
  LogOut,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboardHeader = window.location.pathname?.includes("/dashboard");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Features", href: "#features" },
    { name: "Plans", href: "#products" },
    { name: "Benefits", href: "#benefits" },
    { name: "Reviews", href: "#testimonials" },
  ];

  return isDashboardHeader ? (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-white/90 backdrop-blur-md py-4"
      )}
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
            <BookOpen className="h-6 w-6 text-primary-600 group-hover:text-primary-700 transition-colors" />
          </motion.div>
          <motion.span
            className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            NewsCorp - FSS
          </motion.span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="cursor-pointer border-2 border-primary-100 hover:border-primary-200 transition-colors">
                <AvatarImage src="/images/avatar.jpg" />
                <AvatarFallback className="bg-primary-100 text-primary-600 font-medium">
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
  ) : (
    <>
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
            : "bg-white/90 backdrop-blur-md py-4"
        )}
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/News_Corp_logo_2013.svg" className="h-8 mt-2 w-full" />
              {/* <BookOpen className="h-6 w-6 text-primary-600 group-hover:text-primary-700 transition-colors" /> */}
            </motion.div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              - FSS
            </motion.span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-gray-600 hover:text-primary-600 transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-primary-600"
              >
                Sign In
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate("/products")}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg shadow-primary-500/20"
              >
                Subscribe
              </Button>
            </motion.div>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-100 md:hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between py-2 text-gray-600 hover:text-primary-600 transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4 transform rotate-90" />
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                    onClick={() => {
                      navigate("/products");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
