import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface OverviewChartProps {
  data: {
    date: string;
    revenue: number;
    subscriptions: number;
  }[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value: any) => `$${value / 1000}k`}
          />
          <Tooltip
            formatter={(value: any) => [`$${value}`, "Revenue"]}
            labelFormatter={(label: any) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="subscriptions"
            stroke="#82ca9d"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
