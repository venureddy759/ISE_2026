function SummaryCards({ stats }: any) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
        <p className="text-gray-500">Total Policies</p>
        <h2 className="text-2xl font-bold">{stats.totalPolicies}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
        <p className="text-gray-500">Categories</p>
        <h2 className="text-2xl font-bold">{stats.categories.length}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
        <p className="text-gray-500">Latest Update</p>
        <h2 className="text-2xl font-bold">Today</h2>
      </div>

    </div>
  );
}

export default SummaryCards;