import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-14 bg-gray-800 text-white flex items-center justify-between px-6 z-50">

      {/* 🔹 Logo */}
      <h2 className="text-lg font-semibold">Policy Lens</h2>

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-4">

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search policies..."
          className="px-3 py-1 rounded bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 🔔 Notifications */}
        <span className="cursor-pointer hover:text-gray-300">🔔</span>

        {/* 👤 Profile */}
        <span className="cursor-pointer hover:text-gray-300">👤</span>

        {/* 🚪 Logout */}
        <button
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;