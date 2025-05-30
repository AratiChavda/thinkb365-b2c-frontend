import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  Activity,
  CreditCard, BarChart2,
  RefreshCw,
  TrendingUp, User,
  ShoppingCart,
  Package, Tag,
  MessageSquare
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function AdminDashboard() {
  // const { theme, setTheme } = useTheme()
  const [isRadialMenuOpen, setRadialMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [aiInsight, setAiInsight] = useState("");
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  // const [unreadNotifications] = useState(3)
  const [voiceCommand] = useState("");
  // const [isListening, setIsListening] = useState(false)
  const radialMenuRef = useRef<HTMLDivElement>(null);

  const stats = {
    revenue: "$52,894",
    subscribers: "9,421",
    avgSession: "4m 23s",
    conversion: "3.8%",
    activeProducts: 42,
    pendingOrders: 7,
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        radialMenuRef.current &&
        !radialMenuRef.current.contains(event.target as Node)
      ) {
        setRadialMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateInsight = () => {
    setIsLoadingInsight(true);
    setTimeout(() => {
      setAiInsight(
        "Your premium plan conversions increased by 18% this week. Consider promoting it more prominently."
      );
      setIsLoadingInsight(false);
    }, 1500);
  };

  // const startListening = () => {
  //   setIsListening(true)
  //   setTimeout(() => {
  //     setVoiceCommand('Show last month revenue')
  //     setIsListening(false)
  //   }, 2000)
  // }

  return (
    <div className="relative min-h-screen p-4 md:p-6 overflow-hidden">
      {/* Animated background elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10 dark:bg-purple-500/10"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div> */}

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative z-10">
        <div>
          <motion.h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            SubVision Dashboard
          </motion.h1>
          <p className="text-muted-foreground">
            Real-time insights for your subscription platform
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* <Button 
            variant="ghost" 
            size="icon"
            onClick={startListening}
            className={`rounded-full backdrop-blur-lg bg-white/50 dark:bg-black/50 ${isListening ? 'animate-pulse ring-2 ring-blue-500' : ''}`}
          >
            {isListening ? (
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
          </Button> */}

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full backdrop-blur-lg bg-white/50 dark:bg-black/50"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip> */}

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full backdrop-blur-lg bg-white/50 dark:bg-black/50"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip> */}

          <Button
            variant="default"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            onClick={generateInsight}
            disabled={isLoadingInsight}
          >
            {isLoadingInsight ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Get AI Insight
              </>
            )}
          </Button>
        </div>
      </header>

      {voiceCommand && (
        <motion.div
          className="mb-6 p-4 rounded-lg bg-white/80 dark:bg-black/50 backdrop-blur-lg border border-blue-200 dark:border-purple-800 shadow-md relative z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Voice command detected:</p>
              <p className="text-muted-foreground">"{voiceCommand}"</p>
            </div>
          </div>
        </motion.div>
      )}

      {aiInsight && (
        <motion.div
          className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-lg border border-blue-200 dark:border-purple-800 shadow-md relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium">AI Insight:</p>
              <p className="text-muted-foreground">{aiInsight}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white/50 dark:bg-black/50 backdrop-blur-lg p-1 rounded-full">
            <TabsTrigger
              value="overview"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="subscribers"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger
              value="promotions"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Tag className="h-4 w-4 mr-2" />
              Promotions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Monthly Revenue"
                value={stats.revenue}
                change="+18.2%"
                icon={<DollarSign className="h-4 w-4" />}
                trend="up"
                glowColor="#3b82f6"
              />
              <StatCard
                title="Active Subscribers"
                value={stats.subscribers}
                change="+12.7%"
                icon={<Users className="h-4 w-4" />}
                trend="up"
                glowColor="#8b5cf6"
              />
              <StatCard
                title="Avg. Session"
                value={stats.avgSession}
                change="+5.1%"
                icon={<Activity className="h-4 w-4" />}
                trend="up"
                glowColor="#ec4899"
              />
              <StatCard
                title="Conversion"
                value={stats.conversion}
                change="-0.4%"
                icon={<CreditCard className="h-4 w-4" />}
                trend="down"
                glowColor="#f59e0b"
              />
            </div>

            {/* Charts row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <GlassCard className="lg:col-span-2 h-96">
                <CardHeader>
                  <CardTitle>Subscription Growth</CardTitle>
                </CardHeader>
                <CardContent>{/* <SubscriptionWaveChart /> */}</CardContent>
              </GlassCard>

              <GlassCard className="h-96">
                <CardHeader>
                  <CardTitle>Revenue Split</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64">
                  {/* <RevenueDonut /> */}
                </CardContent>
              </GlassCard>
            </div>

            {/* Second charts row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <GlassCard className="lg:col-span-2 h-96">
                <CardHeader>
                  <CardTitle>User Locations</CardTitle>
                </CardHeader>
                <CardContent>{/* <UserGeoMap /> */}</CardContent>
              </GlassCard>

              <GlassCard className="h-96 overflow-hidden">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="overflow-y-auto h-64">
                  <ActivityFeed />
                </CardContent>
              </GlassCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-8 right-8 z-50" ref={radialMenuRef}>
        {/* <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setRadialMenuOpen(!isRadialMenuOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl cursor-pointer flex items-center justify-center text-white"
        >
          <Plus className="h-6 w-6" />
        </motion.div>

        <AnimatePresence>
          {isRadialMenuOpen && (
            <RadialMenu
              items={[
                {
                  icon: <Plus className="h-5 w-5" />,
                  label: "Add Product",
                  action: () => {},
                },
                {
                  icon: <Zap className="h-5 w-5" />,
                  label: "Create Promo",
                  action: () => {},
                },
                {
                  icon: <User className="h-5 w-5" />,
                  label: "Invite User",
                  action: () => {},
                },
                {
                  icon: <FileText className="h-5 w-5" />,
                  label: "Generate Report",
                  action: () => {},
                },
                {
                  icon: <ShoppingCart className="h-5 w-5" />,
                  label: "New Order",
                  action: () => {},
                },
                {
                  icon: <Gift className="h-5 w-5" />,
                  label: "Create Bundle",
                  action: () => {},
                },
              ]}
              onClose={() => setRadialMenuOpen(false)}
            />
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
}

function GlassCard({
  children,
  className,
  glowColor = "#3b82f6",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{
        boxShadow: `0 8px 32px 0 ${glowColor}20`,
      }}
    >
      <Card
        className={`backdrop-blur-lg bg-white/30 dark:bg-black/30 border border-white/20 dark:border-black/20 ${className}`}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  trend,
  glowColor,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
  glowColor?: string;
}) {
  return (
    <GlassCard glowColor={glowColor}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 rounded-full bg-white/50 dark:bg-black/50">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div
          className={`flex items-center text-xs mt-1 ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
          )}
          {change} from last month
        </div>
      </CardContent>
    </GlassCard>
  );
}

function ActivityFeed() {
  const activities = [
    {
      id: 1,
      user: "Alex Johnson",
      action: "upgraded to Premium plan",
      time: "2 min ago",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: 2,
      user: "Maria Garcia",
      action: "cancelled subscription",
      time: "15 min ago",
      icon: <RefreshCw className="h-4 w-4" />,
    },
    {
      id: 3,
      user: "James Smith",
      action: "purchased annual bundle",
      time: "1 hour ago",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      id: 4,
      user: "Sarah Lee",
      action: "renewed subscription",
      time: "3 hours ago",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: 5,
      user: "David Kim",
      action: "signed up for trial",
      time: "5 hours ago",
      icon: <User className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          whileHover={{ x: 5 }}
          className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
        >
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
            {activity.icon}
          </div>
          <div>
            <p className="font-medium">{activity.user}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} · {activity.time}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RadialMenu({
  items,
  onClose,
}: {
  items: { icon: React.ReactNode; label: string; action: () => void }[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute bottom-20 right-0"
    >
      <div className="relative">
        {items.map((item, index) => {
          const angle = index * (360 / items.length) - 90;
          const radius = 100;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.button
              key={index}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x, y, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg"
              style={{ left: x, top: y }}
            >
              {item.icon}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
