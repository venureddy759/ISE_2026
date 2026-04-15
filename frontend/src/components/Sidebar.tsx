import { LayoutDashboard, Bell, FolderKanban, Search, BarChart3, Star, Settings } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type SidebarProps = {
  activeTab: string;
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
};

function Sidebar({ setActiveTab, activeTab, isOpen, onClose }: SidebarProps) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "updates", label: "Updates", icon: Bell },
    { key: "categories", label: "Categories", icon: FolderKanban },
    { key: "search", label: "Search Policies", icon: Search },
    { key: "reports", label: "Reports", icon: BarChart3 },
    { key: "saved", label: "Saved Policies", icon: Star },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close sidebar overlay"
            className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-gray-950 border-r border-white/10 p-4 z-40 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <div className="mb-5 px-2">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">Navigation</p>
                <h3 className="text-white font-semibold text-lg mt-1">Workspace</h3>
              </div>

              <nav className="space-y-2">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  const active = activeTab === item.key;

                  return (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setActiveTab(item.key);
                        onClose();
                      }}
                      className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-left ${
                        active
                          ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={18} className={`${active ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
                      <span className="text-sm font-medium">{item.label}</span>

                      {active && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute right-3 w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-gray-400">PolicyLens AI</p>
                <p className="text-sm text-white font-medium mt-1">Smart recommendations enabled</p>
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
