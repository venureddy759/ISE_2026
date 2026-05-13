function Stepper({ step, steps = ["Basic", "Business", "Review"] }: { step: number; steps?: string[] }) {
  const progress = steps.length > 1 ? ((step - 1) / (steps.length - 1)) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between text-sm mb-2">
        {steps.map((label, index) => (
          <span
            key={index}
            className={`${
              step === index + 1 ? "text-black font-medium" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="relative flex items-center">
        <div className="absolute left-0 right-0 h-1 bg-gray-300 rounded"></div>

        <div
          className="absolute h-1 bg-blue-500 rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex w-full justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded-full border-2 ${
                step > index
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stepper;
