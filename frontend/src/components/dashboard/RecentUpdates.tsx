function RecentUpdates({ policies }: any) {
  if (!policies?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-sm text-slate-500">
        No recent updates to show yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {policies.map((p: any, index: number) => (
        <div
          key={p.id}
          className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-4 transition hover:border-slate-300 hover:bg-white"
        >
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-sm font-semibold text-orange-700">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-900">{p.title}</p>
            <p className="mt-1 text-sm text-slate-500">{p.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentUpdates;
