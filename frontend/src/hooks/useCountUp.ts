import { useEffect, useState } from "react";

function useCountUp(end: number, duration: number = 1.5) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    // 🎯 Ease-out function (smooth slow ending)
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = (timestamp - startTime) / (duration * 1000);
      const clamped = Math.min(progress, 1);

      const easedProgress = easeOutCubic(clamped);
      const value = Math.floor(easedProgress * end);

      setCount(value);

      if (clamped < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // ensure exact final value
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}

export default useCountUp;