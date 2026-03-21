import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardPage() {

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1 }}>
          <h2>Welcome to Dashboard 🚀</h2>

          <h3>Recent Updates</h3>
          <p>Policy update 1...</p>
          <p>Policy update 2...</p>

          <h3>Reports</h3>
          <p>Charts coming soon 📊</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;