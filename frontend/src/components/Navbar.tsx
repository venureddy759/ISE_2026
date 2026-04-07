import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {

  const [user, setUser] = useState<any>(null);


  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
        {user && (
          <div className="flex items-center gap-2 cursor-pointer">

            {/* Profile Image */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                {user.email?.[0].toUpperCase()}
              </div>
            )}

            {/* Name or Email */}
            <span className="text-sm hidden md:block">
              {user.displayName || user.email}
            </span>

          </div>
          )}

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