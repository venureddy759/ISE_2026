import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#14b8a6"];

function PolicyPieChart({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            backdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        />

        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          innerRadius={60}   // 🔥 donut
          outerRadius={90}
          paddingAngle={4}
        >
          {data.map((_: any, index: number) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
              className="hover:opacity-80 transition"
            />
          ))}
        </Pie>

      </PieChart>
    </ResponsiveContainer>
  );
}

export default PolicyPieChart;