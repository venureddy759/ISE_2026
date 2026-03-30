import useCountUp from "../../hooks/useCountUp";

function SummaryCards({ stats }: any) {
  if (!stats) return null;

  const totalPolicies = useCountUp(stats.totalPolicies || 0);
  const categories = useCountUp(stats.categories?.length || 0);
  const updates = useCountUp(5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
        <p className="text-gray-500">Total Policies</p>
        <h2 className="text-2xl font-bold text-gray-900">{totalPolicies}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
        <p className="text-gray-500">Categories</p>
        <h2 className="text-2xl font-bold text-gray-900">{categories}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
        <p className="text-gray-500">Latest Updates</p>
        <h2 className="text-2xl font-bold text-gray-900">{updates}</h2>
      </div>

    </div>
  );
}

export default SummaryCards;