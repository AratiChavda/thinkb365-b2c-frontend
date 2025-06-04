import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { adminNavItems } from "./adminNavItems";

export function SidebarNav() {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  return (
    <Sidebar collapsible="offcanvas" variant="inset" className="bg-gray-50">
      <SidebarHeader>
        <div className="px-4 py-2">
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
              className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
             - FSS
            </motion.span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))]"
                        : "hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))] text-[hsl(var(--sidebar-foreground))]"
                    )}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
