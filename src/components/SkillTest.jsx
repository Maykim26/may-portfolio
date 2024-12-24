import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const MultiSectionRollingText = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const containerElement = containerRef.current;

    const texts = ['1. 저는 첫 번째 텍스트입니다.', '2. 저는 두 번째 텍스트입니다.', '3. 저는 세 번째 텍스트입니다.'];

    // 텍스트 롤링 애니메이션 설정
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerElement, // 롤링 섹션을 기준으로 동작
        start: 'top top', // 섹션 상단이 화면 상단에 닿을 때 시작
        end: '+=100%', // 섹션이 끝날 때
        scrub: true, // 스크롤과 동기화
        pin: true, // 섹션 고정
        markers: true, // 디버깅용 마커 활성화
      },
    });

    // 텍스트 롤링 애니메이션 추가
    texts.forEach((text, index) => {
      tl.to(
        textElement,
        {
          textContent: text, // 텍스트 변경
          duration: 1, // 각 텍스트의 지속 시간
          ease: 'none',
        },
        index * 2, // 텍스트 변경 순서
      );
    });
  }, []);

  return (
    <div>
      {/* 첫 번째 일반 섹션 */}
      <section
        style={{
          height: '100vh',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>첫 번째 섹션</h1>
      </section>

      {/* 텍스트 롤링 섹션 */}
      <section
        ref={containerRef}
        className="rolling-section"
        style={{
          height: '100vh',
          background: '#cce7ff',
          position: 'relative', // 고정을 위한 기준
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          <span ref={textRef}>1. 저는 첫 번째 텍스트입니다.</span>
        </div>
      </section>

      {/* 세 번째 일반 섹션 */}
      <section
        style={{
          height: '100vh',
          background: '#f7c7db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>세 번째 섹션</h1>
      </section>
    </div>
  );
};

export default MultiSectionRollingText;
