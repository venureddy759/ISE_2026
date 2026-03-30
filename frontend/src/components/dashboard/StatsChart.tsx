import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const colors = ["#3b82f6", "#10b981", "#f59e0b"];

function StatsChart({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
          }}
        />

        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((_: any, index: number) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Bar>

      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatsChart;