import { useEffect, useState } from "react";

const BRAND_VARIANTS = [
  { text: "Policy Lens", language: "English" },
  { text: "नीति लेंस", language: "हिन्दी" },
  { text: "పాలసీ లెన్స్", language: "తెలుగు" },
  { text: "கொள்கை லென்ஸ்", language: "தமிழ்" },
  { text: "ನೀತಿ ಲೆನ್ಸ್", language: "ಕನ್ನಡ" },
  { text: "নীতি লেন্স", language: "বাংলা" },
];

export function useRotatingIndianTitle(intervalMs = 2400) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BRAND_VARIANTS.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return {
    current: BRAND_VARIANTS[index],
    index,
  };
}

export default useRotatingIndianTitle;