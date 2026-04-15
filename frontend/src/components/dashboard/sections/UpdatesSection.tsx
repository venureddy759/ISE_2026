import RecentUpdates from "../RecentUpdates";
import UserPolicies from "../UserPolicies";

function UpdatesSection({ recent, userPolicies }: any) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/75 p-5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] md:p-6">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 to-red-500"></div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Recent Updates</h3>
        <RecentUpdates policies={recent} />
      </div>

      <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/75 p-5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)] md:p-6">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Your Updates</h3>
        <UserPolicies policies={userPolicies} />
      </div>
    </div>
  );
}

export default UpdatesSection;
