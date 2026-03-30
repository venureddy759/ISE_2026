import StatsChart from "../StatsChart";
import PolicyPieChart from "../PolicyPieChart";
import PolicyTrendChart from "../PolicyTrendChart";

function ReportsSection({ stats }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      <div className="bg-white p-4 rounded-xl shadow">
        {stats && <StatsChart data={stats.categories} />}
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        {stats && <PolicyPieChart data={stats.categories} />}
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <PolicyTrendChart
          data={[
            { month: "Jan", count: 10 },
            { month: "Feb", count: 20 },
          ]}
        />
      </div>

    </div>
  );
}

export default ReportsSection;