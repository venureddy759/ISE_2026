import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Menu, X, Bell } from "lucide-react";

type NavbarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
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
    <>
      <header className="fixed top-0 left-0 right-0 h-16 z-50 border-b border-white/10 bg-gray-950/95 backdrop-blur-xl shadow-2xl">
        <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={isSidebarOpen}
              className="w-10 h-10 rounded-2xl border border-white/10 bg-gray-900 hover:bg-gray-800 transition flex items-center justify-center text-white"
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">Dashboard</p>
              <h2 className="text-lg md:text-xl font-semibold text-white truncate">PolicyLens Control Center</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-gray-900 px-3 py-2 w-64">
              <span className="text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search policies..."
                className="w-full text-sm bg-transparent outline-none text-white placeholder:text-gray-500"
              />
            </div>

            <button className="w-10 h-10 rounded-2xl border border-white/10 bg-gray-900 hover:bg-gray-800 transition flex items-center justify-center text-white">
              <Bell size={18} />
            </button>

            {user && (
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-gray-900 px-2 py-1.5">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="profile" className="w-9 h-9 rounded-xl object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-sm font-medium">
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}
                <div className="hidden lg:block max-w-[180px]">
                  <p className="text-sm font-medium text-white truncate">{user.displayName || user.email}</p>
                  <p className="text-xs text-gray-400">Authenticated User</p>
                </div>
              </div>
            )}

            <button
              className="rounded-2xl bg-rose-500 text-white px-4 py-2 text-sm font-medium hover:bg-rose-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      
    </>
  );
}

export default Navbar;
