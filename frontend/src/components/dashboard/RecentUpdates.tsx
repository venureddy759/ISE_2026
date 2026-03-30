function RecentUpdates({ policies }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
  <h3 className="font-semibold mb-4">Recent Updates</h3>

  <div className="space-y-3">
    {policies.map((p: any) => (
      <div
        key={p.id}
        className="p-3 border rounded-lg hover:bg-gray-50 transition"
      >
        <p className="font-medium">{p.title}</p>
        <p className="text-sm text-gray-500">{p.date}</p>
      </div>
    ))}
  </div>
</div>
  );
}

export default RecentUpdates;