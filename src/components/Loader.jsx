import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let start = null;
    const animate = timestamp => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      // 숫자가 100에 도달하는 시간 설정 (3초 동안 증가)
      const increment = Math.min(progress / 30, 101);
      setNumber(Math.floor(increment)); // 소수점 없이 정수로 처리

      if (increment < 101) {
        requestAnimationFrame(animate); // 계속 애니메이션을 진행
      } else {
        if (onComplete) {
          onComplete(); // 로딩 완료 후 onComplete 콜백 호출
        }
      }
    };

    // 로딩 시작
    requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animate); // 컴포넌트 언마운트 시 애니메이션 종료
  }, [onComplete]);

  // number가 10 미만일 때 앞에 0을 추가
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
