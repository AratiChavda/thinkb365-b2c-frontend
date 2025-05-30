import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { formatCurrency } from "@/lib/formatCurrency";

const statIcons = {
  revenue: <Icons.dollar className="h-4 w-4" />,
  subscribers: <Icons.users className="h-4 w-4" />,
  mrr: <Icons.trendingUp className="h-4 w-4" />,
  churn: <Icons.trendingDown className="h-4 w-4" />,
};

interface QuickStatsProps {
  stats: {
    revenue: number;
    subscribers: number;
    mrr: number;
    churn: number;
    growthRate: number;
    activePromotions: number;
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          {statIcons.revenue}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats.revenue)}
          </div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
          {statIcons.subscribers}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.subscribers}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.growthRate}% growth
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">MRR</CardTitle>
          {statIcons.mrr}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.mrr)}</div>
          <p className="text-xs text-muted-foreground">Recurring revenue</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
          {statIcons.churn}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.churn}%</div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Promos</CardTitle>
          <Icons.promoCodes className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activePromotions}</div>
          <p className="text-xs text-muted-foreground">Running campaigns</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ARPU</CardTitle>
          <Icons.userMoney className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats.revenue / stats.subscribers)}
          </div>
          <p className="text-xs text-muted-foreground">Per subscriber</p>
        </CardContent>
      </Card>
    </div>
  );
}
