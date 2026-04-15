import { AreaChart, BellRing, ChartPie, LineChart, Sparkles } from "lucide-react";
import PolicyPieChart from "../PolicyPieChart";
import PolicyTrendChart from "../PolicyTrendChart";
import RecentUpdates from "../RecentUpdates";
import StatsChart from "../StatsChart";
import SummaryCards from "../SummaryCards";
import UserPolicies from "../UserPolicies";

function DashboardOverview({ stats, recent, userPolicies, onSelectPolicy }: any) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[32px] border border-white/80 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.94))] px-6 py-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] md:px-8 md:py-8">
        <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-sky-100">
              <Sparkles size={14} />
              Dashboard Overview
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              A wider command center for your policy workflow
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              Your charts, summaries, and update feeds now stretch across the full dashboard width while keeping the same navigation and interaction flow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[460px]">
            {[
              { label: "Policies", value: stats?.totalPolicies ?? 0 },
              { label: "Categories", value: stats?.categories?.length ?? 0 },
              { label: "Recent", value: recent?.length ?? 0 },
              { label: "Saved", value: userPolicies?.length ?? 0 },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SummaryCards stats={stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-5">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <AreaChart size={18} className="text-sky-600" />
              Category Statistics
            </h3>
            <p className="mt-1 text-sm text-slate-500">See which policy groups are getting the most coverage.</p>
          </div>
          {stats && <StatsChart data={stats.categories} />}
        </div>

        <div className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-3">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500" />
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <ChartPie size={18} className="text-fuchsia-600" />
              Policy Distribution
            </h3>
            <p className="mt-1 text-sm text-slate-500">A quick mix view of policy volume by category.</p>
          </div>
          {stats && <PolicyPieChart data={stats.categories} />}
        </div>

        <div className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-4">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <LineChart size={18} className="text-emerald-600" />
              Policy Trends
            </h3>
            <p className="mt-1 text-sm text-slate-500">Track how policy changes are moving across the year.</p>
          </div>
          <PolicyTrendChart
            data={[
              { month: "Jan", count: 10 },
              { month: "Feb", count: 20 },
              { month: "Mar", count: 35 },
              { month: "Apr", count: 5 },
              { month: "May", count: 15 },
              { month: "Jun", count: 22 },
              { month: "Jul", count: 30 },
              { month: "Aug", count: 50 },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 text-gray-900 xl:grid-cols-12">
        <div className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-7">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500" />
          <div className="mb-5">
            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
              <BellRing size={18} className="text-orange-600" />
              Recent Updates
            </h3>
            <p className="mt-1 text-sm text-slate-500">Latest policy activity flowing into the workspace.</p>
          </div>
          <RecentUpdates policies={recent} />
        </div>

        <div className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] md:p-6 xl:col-span-5">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500" />
          <div className="mb-5">
            <h3 className="font-semibold text-slate-900">Your Updates</h3>
            <p className="mt-1 text-sm text-slate-500">Policies you interacted with most recently.</p>
          </div>
          <UserPolicies
            policies={userPolicies?.slice(0, 3)}
            onSelect={onSelectPolicy}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
