import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillText } from '../constants';

// ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const containerRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0); // 현재 보이는 title의 인덱스
  const textRef = useRef([]);
  const descRef = useRef([]);

  useEffect(() => {
    const containerElement = containerRef.current;

    // ScrollTrigger 설정
    ScrollTrigger.create({
      trigger: containerElement,
      start: 'top top', // 섹션 시작 지점
      end: '+=150%', // 섹션 끝 지점
      scrub: true, // 스크롤과 동기화
      pin: true, // 섹션 고정
      markers: false, // 디버깅용 마커
      onUpdate: self => {
        // 현재 스크롤 위치에 따라 보여줄 index 계산
        const newIndex = Math.floor(self.progress * skillText.length);
        setVisibleIndex(newIndex); // index 업데이트
      },
    });
  }, []);

  useEffect(() => {
    // GSAP 애니메이션 처리: 텍스트가 롤링되듯이 스무스하게 나타남
    const currentTitle = textRef.current[visibleIndex];
    const currentDesc = descRef.current[visibleIndex];

    // 텍스트 롤링 애니메이션: 위로 부드럽게 나타나도록
    if (currentTitle) {
      gsap.fromTo(
        currentTitle,
        { opacity: 0.7, translateY: 10 }, // 아래로 내려오며 보이지 않음
        { opacity: 1, translateY: 0, duration: 0.6, ease: 'circ.inOut', force3D: true }, // 자연스럽게 위로 올라오며 보임
      );
    }

    if (currentDesc) {
      gsap.fromTo(
        currentDesc,
        { opacity: 0.5 }, // 아래로 내려오며 보이지 않음
        { opacity: 1, duration: 0.6, ease: 'circ.inOut', force3D: true }, // 자연스럽게 위로 올라오며 보임
      );
    }
  }, [visibleIndex]); // visibleIndex가 바뀔 때마다 애니메이션 발생

  return (
    <section id="skill" ref={containerRef}>
      <div className="skill__inner">
        <h2 className="skill__title">My skill</h2>
        <div className="skill__desc">
          <div>
            {skillText.map((skill, key) => (
              <div key={key} className="desc__wrap">
                <h3
                  ref={el => (textRef.current[key] = el)} // title에 대한 ref 저장
                  style={{
                    opacity: key === visibleIndex ? 1 : 0, // 현재 인덱스만 보이게 설정
                    visibility: key === visibleIndex ? 'visible' : 'hidden', // 보이는 항목만 보이도록 설정
                  }}
                >
                  <span>{key + 1}.</span> {skill.title}
                </h3>
                <p
                  ref={el => (descRef.current[key] = el)} // desc에 대한 ref 저장
                  style={{
                    opacity: key === visibleIndex ? 1 : 0, // 현재 인덱스만 보이게 설정
                    visibility: key === visibleIndex ? 'visible' : 'hidden', // 보이는 항목만 보이도록 설정
                  }}
                >
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;
