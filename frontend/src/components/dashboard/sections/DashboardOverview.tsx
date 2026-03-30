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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          {stats && <StatsChart data={stats.categories} />}
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          {stats && <PolicyPieChart data={stats.categories} />}
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <PolicyTrendChart
            data={[
              { month: "Jan", count: 10 },
              { month: "Feb", count: 20 },
              { month: "Mar", count: 35 },
            ]}
          />
        </div>

      </div>

      {/* 📢 🔥 NEW: Compact Updates Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900">

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-3">Recent Updates</h3>
          <RecentUpdates policies={recent?.slice(0, 3)} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-3">Your Updates</h3>
          <UserPolicies policies={userPolicies?.slice(0, 3)} />
        </div>

      </div>
    </>
  );
}

export default DashboardOverview;