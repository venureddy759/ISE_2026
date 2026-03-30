import RecentUpdates from "../RecentUpdates";
import UserPolicies from "../UserPolicies";

function UpdatesSection({ recent, userPolicies }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <RecentUpdates policies={recent} />
      <UserPolicies policies={userPolicies} />
    </div>
  );
}

export default UpdatesSection;