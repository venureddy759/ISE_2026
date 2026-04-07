import RecentUpdates from "../RecentUpdates";
import UserPolicies from "../UserPolicies";

function UpdatesSection({ recent, userPolicies }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* RECENT UPDATES */}
      <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Gradient Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>

        <h3 className="font-semibold mb-4 text-gray-800">📢 Recent Updates</h3>

        <RecentUpdates policies={recent} />
      </div>

      {/* YOUR UPDATES */}
      <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Gradient Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

        <h3 className="font-semibold mb-4 text-gray-800">👤 Your Updates</h3>

        <UserPolicies policies={userPolicies} />
      </div>
    </div>
  );
}

export default UpdatesSection;
