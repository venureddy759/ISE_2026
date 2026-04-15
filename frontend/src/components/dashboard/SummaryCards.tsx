import { Activity, Files, FolderTree } from "lucide-react";
import useCountUp from "../../hooks/useCountUp";

function SummaryCards({ stats }: any) {
  const totalPolicies = useCountUp(stats?.totalPolicies || 0);
  const categories = useCountUp(stats?.categories?.length || 0);
  const updates = useCountUp(100);

  if (!stats) {
    return <p>Loading...</p>;
  }

  const cards = [
    {
      label: "Total Policies",
      value: totalPolicies,
      note: "All tracked documents",
      icon: Files,
      shell: "from-sky-500/15 via-blue-500/10 to-white",
      badge: "bg-sky-100 text-sky-700",
    },
    {
      label: "Categories",
      value: categories,
      note: "Organized coverage areas",
      icon: FolderTree,
      shell: "from-emerald-500/15 via-teal-500/10 to-white",
      badge: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Latest Updates",
      value: updates,
      note: "Recent policy activity signals",
      icon: Activity,
      shell: "from-amber-500/15 via-orange-500/10 to-white",
      badge: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className={`relative overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br ${card.shell} p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)] md:p-6`}
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">{card.label}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  {card.value}
                </h2>
                <p className="mt-2 text-sm text-slate-500">{card.note}</p>
              </div>

              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.badge}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;
