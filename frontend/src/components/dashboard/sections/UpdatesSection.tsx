import RecentUpdates from "../RecentUpdates";
import UserPolicies from "../UserPolicies";

function UpdatesSection({ recent, userPolicies }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-3">Recent Updates</h3>
          <RecentUpdates policies={recent} />
        </div>
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-3">Your Updates</h3>
          <UserPolicies policies={userPolicies} />
        </div>
    </div>
  );
}

export default UpdatesSection;