function UserPolicies({ policies, onSelect }: any) {
  if (!policies?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-sm text-slate-500">
        No user policy activity available yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {policies.map((p: any) => (
        <div
          key={p.id}
          onClick={() => onSelect?.(p)}
          className={`rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-4 transition ${
            onSelect ? "cursor-pointer hover:border-slate-300 hover:bg-white" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-slate-900">{p.title}</p>
              <p className="mt-1 text-sm text-slate-500">{p.date}</p>
            </div>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              View
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPolicies;
