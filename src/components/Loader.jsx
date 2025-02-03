import React, { useEffect, useState, useRef } from 'react';

const Loader = ({ onComplete }) => {
  const [number, setNumber] = useState(0);
  const [stuckAt100, setStuckAt100] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    let start = null;
    const animate = timestamp => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      let increment = Math.min(progress / 15, 100);

      if (increment === 100 && !stuckAt100) {
        setStuckAt100(true);
        setTimeout(() => {
          setStuckAt100(false);
          if (onComplete) onComplete();
        }, 700); // 0.5초 동안 멈추게 함
      }

      if (!stuckAt100) {
        setNumber(Math.floor(increment));
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [onComplete, stuckAt100]);

  let numberString = number < 10 ? '0' + number : number;

  return (
    <div className="loader-container">
      <div className="line"></div>
      <div className="loader">
        {numberString}
        <sup>%</sup>
      </div>
    </div>
  );
};

export default Loader;
