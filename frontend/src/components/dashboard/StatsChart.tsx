import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

function StatsChart({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barCategoryGap={40}>

        {/* GRID */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />

        {/* AXIS */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        {/* TOOLTIP */}
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            backdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        />

        {/* GRADIENT */}
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
          </linearGradient>
        </defs>

        {/* BAR */}
        <Bar
          dataKey="count"
          radius={[10, 10, 0, 0]}
          fill="url(#barGradient)"
        />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatsChart;