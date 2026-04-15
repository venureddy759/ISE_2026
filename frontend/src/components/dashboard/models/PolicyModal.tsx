function PolicyModal({ policy, onClose }: any) {
  if (!policy) return null;

  const status = policy.status || 'Not Eligible';
  const score = policy.score ?? 75;
  const criteria = policy.criteria || [
    { label: 'Income below threshold', passed: false },
    { label: 'Resident of Andhra Pradesh', passed: true },
    { label: 'Required documents uploaded', passed: false },
    { label: 'Age requirement met', passed: true },
  ];
  const suggestions = policy.suggestions || [
    'Upload missing income certificate',
    'Complete Aadhaar verification',
    'Check alternate schemes for your profile',
  ];

  const statusStyles: any = {
    Eligible: 'bg-emerald-100 text-emerald-700',
    'Partially Eligible': 'bg-amber-100 text-amber-700',
    'Not Eligible': 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl rounded-3xl shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-xl overflow-hidden">
          <div className="flex justify-between items-start p-6 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Policy</p>
              <h2 className="text-2xl font-semibold text-gray-800">{policy.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{new Date(policy.date).toDateString()}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl transition">✕</button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3">
            <div className="xl:col-span-1 p-6 border-b xl:border-b-0 xl:border-r border-gray-200 space-y-6">
              <div>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">Recent Update</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed">{policy.description || 'No description available'}</p>
              </div>
            </div>

            <div className="xl:col-span-2 p-6 space-y-6 bg-gradient-to-br from-slate-50 to-white">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <p className="text-xs text-gray-400 uppercase mb-2">Eligibility</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>{status}</span>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:col-span-2">
                  <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Match Score</span><span className="font-medium text-gray-700">{score}%</span></div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-gray-800 rounded-full" style={{ width: `${score}%` }} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Eligibility Criteria</h3>
                <div className="space-y-3">
                  {criteria.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <span className={`text-sm font-medium ${item.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.passed ? '✓ Pass' : '✕ Fail'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-800 mb-4">What You Can Do</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {suggestions.map((tip: string, idx: number) => (
                    <div key={idx} className="rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-700 bg-gray-50">{tip}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyModal;
