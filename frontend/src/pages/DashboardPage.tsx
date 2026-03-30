import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import {
  fetchStats,
  fetchRecentPolicies,
  fetchUserPolicies,
} from "../services/api";
import StatsChart from "../components/dashboard/StatsChart";
import RecentUpdates from "../components/dashboard/RecentUpdates";
import SummaryCards from "../components/dashboard/SummaryCards";
import UserPolicies from "../components/dashboard/UserPolicies";
import PolicyPieChart from "../components/dashboard/PolicyPieChart";
import PolicyTrendChart from "../components/dashboard/PolicyTrendChart";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [userPolicies, setUserPolicies] = useState<any[]>([]);

  const userId = "123";

  useEffect(() => {
    fetchStats().then(setStats);
    fetchRecentPolicies().then(setRecent);
    fetchUserPolicies(userId).then(setUserPolicies);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
          <div className="ml-60 mt-14 flex-1 p-6 space-y-6 overflow-y-auto h-[calc(100vh-56px)]">

            <h2 className="text-2xl font-bold">
              Welcome to Dashboard 🚀
            </h2>

            {/* 🔥 NEW: Summary Cards */}
            <SummaryCards stats={stats} />

            {/* 📊 Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* 📊 Bar Chart */}
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
                  <h3 className="font-semibold mb-4">Category Distribution</h3>
                  {stats && <StatsChart data={stats.categories} />}
                </div>

                {/* 🥧 Pie Chart */}
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
                  <h3 className="font-semibold mb-4">Policy Share</h3>
                  {stats && <PolicyPieChart data={stats.categories} />}
                </div>

                {/* 📈 Line Chart */}
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
                  <h3 className="font-semibold mb-4">Policy Trends</h3>
                  <PolicyTrendChart
                    data={[
                      { month: "Jan", count: 10 },
                      { month: "Feb", count: 20 },
                      { month: "Mar", count: 35 },
                      { month: "Apr", count: 25 },
                      { month: "May", count: 40 },
                    ]}
                  />
                </div>

              </div>

            {/* Updates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RecentUpdates policies={recent} />
              <UserPolicies policies={userPolicies} />
            </div>

          </div>
      </div>
    </div>
  );
}

export default DashboardPage;