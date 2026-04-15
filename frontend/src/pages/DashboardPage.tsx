import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardOverview from "../components/dashboard/sections/DashboardOverview";
import UpdatesSection from "../components/dashboard/sections/UpdatesSection";
import ReportsSection from "../components/dashboard/sections/ReportsSection";
import PolicyModal from "../components/dashboard/models/PolicyModal";
import {
  fetchRecentPolicies,
  fetchStats,
  fetchUserPolicies,
} from "../services/api";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [userPolicies, setUserPolicies] = useState<any[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  const userId = "123";

  useEffect(() => {
    fetchStats().then(setStats);
    fetchRecentPolicies().then(setRecent);
    fetchUserPolicies(userId).then(setUserPolicies);
  }, []);

  const renderPlaceholder = (title: string) => (
    <div className="rounded-[28px] border border-white/70 bg-white/85 p-10 text-center shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <h2 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500">This module is under development.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_20%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_46%,_#f8fafc_100%)] text-gray-900">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
      />

      <div className="flex">
        <Sidebar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="mt-14 h-[calc(100vh-56px)] w-full flex-1 overflow-y-auto">
          <div className="w-full space-y-6 p-4 md:p-6 xl:p-8">
            {activeTab === "dashboard" && (
              <DashboardOverview
                stats={stats}
                recent={recent}
                userPolicies={userPolicies}
                onSelectPolicy={(policy: any) => setSelectedPolicy(policy)}
              />
            )}

            {activeTab === "updates" && (
              <div className="rounded-[28px] border border-white/70 bg-white/85 p-4 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-6">
                <UpdatesSection recent={recent} userPolicies={userPolicies} />
              </div>
            )}

            {activeTab === "reports" && (
              <div className="rounded-[28px] border border-white/70 bg-white/85 p-4 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-6">
                <ReportsSection stats={stats} />
              </div>
            )}

            {activeTab === "categories" && renderPlaceholder("Categories Coming Soon")}
            {activeTab === "saved" && renderPlaceholder("Saved Coming Soon")}
            {activeTab === "settings" && renderPlaceholder("Settings Coming Soon")}
            {activeTab === "search" && renderPlaceholder("Search Coming Soon")}
          </div>
        </main>
      </div>

      {selectedPolicy && (
        <PolicyModal policy={selectedPolicy} onClose={() => setSelectedPolicy(null)} />
      )}
    </div>
  );
}

export default DashboardPage;
