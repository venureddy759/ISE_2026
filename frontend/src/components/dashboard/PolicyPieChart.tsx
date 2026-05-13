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
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (!percent || percent < 0.08) {
      return null;
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    const label = `${(percent * 100).toFixed(0)}%`;

    return (
      <text
        x={x}
        y={y}
        fill="#0f172a"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {label}
      </text>
    );
  };

  const total = data?.reduce((sum: number, item: any) => sum + item.count, 0) ?? 0;

  const tooltipFormatter = (value: any, name: any) => {
    const percentage = total ? `${Math.round((Number(value) / total) * 100)}%` : "0%";
    return [`${value} (${percentage})`, name];
  };

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart margin={{ top: 8, right: 12, left: 12, bottom: 18 }}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="42%"
          innerRadius={52}
          outerRadius={84}
          paddingAngle={3}
          labelLine={false}
          label={renderLabel}
        >
          {data.map((_: any, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip formatter={tooltipFormatter} />

        <Legend
          verticalAlign="bottom"
          height={52}
          wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PolicyPieChart;
