"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import lottie-react (avoids SSR issues)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AnimationLottie = ({ animationPath, width = "95%" }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load JSON only on the client
    if (typeof window !== "undefined") {
      import(`${animationPath}`).then((data) => {
        setAnimationData(data.default || data);
      });
    }
  }, [animationPath]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width }}
    />
  );
};

export default AnimationLottie;
