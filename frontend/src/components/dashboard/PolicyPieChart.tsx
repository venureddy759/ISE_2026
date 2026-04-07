import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#14b8a6"];

function PolicyPieChart({ data }: any) {

  const renderLabel = (entry: any) => {
    const total = data.reduce((sum: number, d: any) => sum + d.count, 0);
    const percent = ((entry.count / total) * 100).toFixed(0);
    return `${percent}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          label={renderLabel}
        >
          {data.map((_: any, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Tooltip */}
        <Tooltip
          formatter={(value: any, name: any) => [`${value}`, name]}
        />

        {/* Legend */}
        <Legend verticalAlign="bottom" height={36} />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default PolicyPieChart;