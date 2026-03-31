import StatsChart from "../StatsChart";
import PolicyPieChart from "../PolicyPieChart";
import PolicyTrendChart from "../PolicyTrendChart";


function ReportsSection({ stats }: any) {
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CATEGORY STATS */}
          <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl"></div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                 📊 Category Statistics
              </h3>
            <div className="focus:outline-none">
          {stats && <StatsChart data={stats.categories} />}
        </div>
      </div>

      {/* PIE */}
      <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl"></div>

        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          🧩 Policy Distribution
        </h3>

        <div className="focus:outline-none">
          {stats && <PolicyPieChart data={stats.categories} />}
        </div>
      </div>

      {/* TREND */}
      <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl"></div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Policy Trends
        </h3>
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