import { useState, useEffect } from "react";

function NumberAnimation({ textSize, textColor, fontWeight, endValue, prefix, suffix, duration }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        setCount(Math.floor((progress / duration) * endValue));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);

  }, [endValue, duration]);

  return(
    <div className={`${textSize} ${fontWeight} ${textColor}`}>
      {`${prefix}${count}${suffix}`}
    </div>
  );
};

export default NumberAnimation;