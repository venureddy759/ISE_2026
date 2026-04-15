import { AreaChart, ChartPie, LineChart } from "lucide-react";
import PolicyPieChart from "../PolicyPieChart";
import PolicyTrendChart from "../PolicyTrendChart";
import StatsChart from "../StatsChart";

function ReportsSection({ stats }: any) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/75 p-5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-5">
        <div className="absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <AreaChart size={18} className="text-sky-600" />
          Category Statistics
        </h3>
        <div className="focus:outline-none">
          {stats && <StatsChart data={stats.categories} />}
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/75 p-5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-3">
        <div className="absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-pink-500 to-purple-500"></div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <ChartPie size={18} className="text-fuchsia-600" />
          Policy Distribution
        </h3>
        <div className="focus:outline-none">
          {stats && <PolicyPieChart data={stats.categories} />}
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/75 p-5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-4">
        <div className="absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <LineChart size={18} className="text-emerald-600" />
          Policy Trends
        </h3>
        <PolicyTrendChart
          data={[
            { month: "Jan", count: 10 },
            { month: "Feb", count: 20 },
          ]}
        />
      </div>
    </div>
  );
}

export default ReportsSection;
