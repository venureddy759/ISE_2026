function Sidebar({ setActiveTab, activeTab }: any) {

  const getClass = (tab: string) =>
    `cursor-pointer px-3 py-2 rounded-lg transition ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <div className="fixed top-14 left-0 w-60 h-[calc(100vh-56px)] bg-gray-900 p-4 space-y-2">
      
      <p
        onClick={() => setActiveTab("dashboard")}
        className={getClass("dashboard")}
      >
        🏠 Dashboard
      </p>

      <p
        onClick={() => setActiveTab("updates")}
        className={getClass("updates")}
      >
        📢 Updates
      </p>

      <p
        onClick={() => setActiveTab("reports")}
        className={getClass("reports")}
      >
        📊 Reports
      </p>

    </div>
  );
}

export default Sidebar;