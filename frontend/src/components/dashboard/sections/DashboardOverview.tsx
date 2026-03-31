import SummaryCards from "../SummaryCards";
import StatsChart from "../StatsChart";
import PolicyPieChart from "../PolicyPieChart";
import PolicyTrendChart from "../PolicyTrendChart";
import RecentUpdates from "../RecentUpdates";
import UserPolicies from "../UserPolicies";

function DashboardOverview({ stats, recent, userPolicies }: any) {
  return (
    <>
      {/* 🔢 Summary */}
      <SummaryCards stats={stats} />

      {/* 📊 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CATEGORY */}
        <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl"></div>

          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            📊 Category Statistics
          </h3>
          
          {stats && <StatsChart data={stats.categories} />}
        </div>

        {/* PIE */}
        <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl"></div>

          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🧩 Policy Distribution
          </h3>

          {stats && <PolicyPieChart data={stats.categories} />}
        </div>

        {/* TREND */}
        <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl"></div>

          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            📈 Policy Trends
          </h3>

          <PolicyTrendChart
            data={[
              { month: "Jan", count: 10 },
              { month: "Feb", count: 20 },
              { month: "Mar", count: 35 },
              { month: "Apr", count: 5 },
              { month: "May", count: 15 },
              { month: "Jun", count: 22 },
              { month: "Jul", count: 30 },
              { month: "Aug", count: 50 },
            ]}
          />
        </div>

      </div>

      {/* 📢 Updates Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 mt-6">

        {/* RECENT */}
        <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-2xl"></div>

          <h3 className="font-semibold mb-4 text-gray-800">
            📢 Recent Updates
          </h3>

          <RecentUpdates policies={recent} />
        </div>

        {/* USER */}
        <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-l p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl"></div>

          <h3 className="font-semibold mb-4 text-gray-800">
            👤 Your Updates
          </h3>

          <UserPolicies policies={userPolicies?.slice(0, 3)} />
        </div>

      </div>
    </>
  );
}

export default DashboardOverview;