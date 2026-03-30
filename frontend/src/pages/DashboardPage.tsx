import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

import DashboardOverview from "../components/dashboard/sections/DashboardOverview";
import UpdatesSection from "../components/dashboard/sections/UpdatesSection";
import ReportsSection from "../components/dashboard/sections/ReportsSection";

import {
  fetchStats,
  fetchRecentPolicies,
  fetchUserPolicies,
} from "../services/api";

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

        <div className="ml-60 mt-14 flex-1 p-6 space-y-6 overflow-y-auto h-[calc(100vh-56px)] text-gray-900">

          {activeTab === "dashboard" && 
            <DashboardOverview 
            stats={stats} 
            recent={recent} 
            userPolicies={userPolicies} 
          />}

          {activeTab === "updates" && (
            <UpdatesSection recent={recent} userPolicies={userPolicies} />
          )}

          {activeTab === "reports" && <ReportsSection stats={stats} />}
          {activeTab === "categories" && <h2>Catrgories Coming Soon 🔍</h2>}
          {activeTab === "saved" && <h2>Saved Coming Soon 🔍</h2>}
          {activeTab === "settings" && <h2>Settings Coming Soon 🔍</h2>}
          {activeTab === "search" && <h2>Search Coming Soon 🔍</h2>}

        </div>
      </div>
    </div>
  );
}

export default DashboardPage;