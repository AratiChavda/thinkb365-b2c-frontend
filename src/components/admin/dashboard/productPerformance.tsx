import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProductPerformanceProps {
  data: {
    productName: string;
    revenue: number;
    subscribers: number;
  }[];
}

export function ProductPerformance({ data }: ProductPerformanceProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis
            dataKey="productName"
            type="category"
            width={100}
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
          <Bar dataKey="revenue" fill="#8884d8" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
