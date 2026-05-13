import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Bell, LogOut, Menu, Search, UserRound, X } from "lucide-react";

type NavbarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 z-50 border-b border-white/10 bg-gray-950/95 backdrop-blur-xl shadow-2xl">
        <div className="flex h-full items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={isSidebarOpen}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gray-900 text-white transition hover:bg-gray-800"
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="min-w-0">
              <p className="hidden text-[10px] uppercase tracking-[0.35em] text-gray-500 sm:block">Dashboard</p>
              <h2 className="truncate text-base font-semibold text-white sm:text-lg md:text-xl">Policy Lens</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden w-64 items-center gap-2 rounded-2xl border border-white/10 bg-gray-900 px-3 py-2 md:flex">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search policies..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>

            <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gray-900 text-white transition hover:bg-gray-800 md:hidden">
              <Search size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gray-900 text-white transition hover:bg-gray-800">
              <Bell size={18} />
            </button>

            {user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((current) => !current)}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-gray-900 px-2 py-1.5 transition hover:bg-gray-800"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="profile" className="h-9 w-9 rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-sm font-medium text-white">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <div className="hidden max-w-[180px] text-left lg:block">
                    <p className="truncate text-sm font-medium text-white">{user.displayName || user.email}</p>
                    <p className="text-xs text-gray-400">Authenticated User</p>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-3xl border border-white/10 bg-gray-950/95 p-3 shadow-2xl backdrop-blur-xl">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="profile" className="h-11 w-11 rounded-2xl object-cover" />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-sm font-medium text-white">
                            {user.email?.[0].toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">{user.displayName || "Policy Lens User"}</p>
                          <p className="truncate text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-3 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white transition hover:bg-white/5"
                    >
                      <UserRound size={16} className="text-sky-400" />
                      User Details
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-rose-300 transition hover:bg-rose-500/10"
                    >
                      <LogOut size={16} className="text-rose-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              className="hidden rounded-2xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600 md:inline-flex"
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
