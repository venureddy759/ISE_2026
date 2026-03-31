import useCountUp from "../../hooks/useCountUp";

function SummaryCards({ stats }: any) {
  if (!stats) return null;

  const totalPolicies = useCountUp(stats.totalPolicies || 0);
  const categories = useCountUp(stats.categories?.length || 0);
  const updates = useCountUp(100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* TOTAL POLICIES */}
      <div className="relative p-5 rounded-md bg-gradient-to-br from-blue-100 to-indigo-200  border border-blue-100 transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Total Policies</p>
          <span className="text-blue-600 text-xl">📄</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {totalPolicies}
        </h2>

        {/* subtle glow */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-400/20 blur-2xl rounded-full"></div>
      </div>


      {/* CATEGORIES */}
      <div className="relative p-5 rounded-md bg-gradient-to-br from-emerald-100 to-teal-500 border border-emerald-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Categories</p>
          <span className="text-emerald-600 text-xl">📊</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {categories}
        </h2>

        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-400/20 blur-2xl rounded-full"></div>
      </div>


      {/* UPDATES */}
      <div className="relative p-5 rounded-md bg-gradient-to-br from-red-100 to-red-200 border border-orange-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Latest Updates</p>
          <span className="text-orange-600 text-xl">⚡</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {updates}
        </h2>

        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-400/20 blur-2xl rounded-full"></div>
      </div>

    </div>
  );
}

export default SummaryCards;