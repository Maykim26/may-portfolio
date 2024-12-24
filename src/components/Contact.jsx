import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const Contact = () => {
  const textBoxRef = useRef(null);
  const wordElementsRef = useRef([]);
  const contactRef = useRef(null); // #contact 요소 참조
  const [isInViewport, setIsInViewport] = useState(false); // 뷰포트 진입 여부

  // Intersection Observer를 사용하여 #contact가 뷰포트에 진입했을 때 물리 엔진 시작
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // #contact가 뷰포트에 진입하면 isInViewport 값을 true로 설정
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInViewport(true); // 뷰포트 진입 시
          }
        });
      },
      {
        threshold: 0.1, // 모바일에서도 좀 더 일찍 감지
      },
    );

    // #contact 요소를 관찰
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    // cleanup
    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  // Matter.js 물리 엔진 초기화
  useEffect(() => {
    if (!isInViewport) return; // #contact가 뷰포트에 없으면 초기화하지 않음

    let engine, runner;

    // splitWords 함수 정의
    const splitWords = () => {
      const textNode = textBoxRef.current;
      const text = textNode.textContent;
      const words = text.split(' ');
      const newElements = words.map((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.setAttribute('key', index);

        // 특정 단어를 highlight 클래스 추가
        if (
          word.toLowerCase().includes('audgml522@naver.com') ||
          word.toLowerCase().includes('010-7159-1823') ||
          word.toLowerCase().includes('자양동') ||
          word.toLowerCase().includes('광진구') ||
          word.toLowerCase().includes('서울시') ||
          word.toLowerCase().includes('may-portfolio.com')
        ) {
          span.classList.add('highlighted');
        }

        return span;
      });

      textNode.textContent = '';
      newElements.forEach(el => {
        textNode.appendChild(el);
      });

      wordElementsRef.current = newElements;
    };

    // 물리 엔진 초기화
    const initializePhysics = () => {
      engine = Matter.Engine.create();
      const world = engine.world;

      // 화면 크기에 맞춰 벽 크기 설정
      const leftWall = Matter.Bodies.rectangle(
        15, // 화면 왼쪽 끝에 위치
        window.innerHeight / 2,
        30,
        window.innerHeight,
        { isStatic: true },
      );
      const rightWall = Matter.Bodies.rectangle(
        window.innerWidth - 15, // 화면 오른쪽 끝에 위치
        window.innerHeight / 2,
        30,
        window.innerHeight,
        { isStatic: true },
      );
      const ground = Matter.Bodies.rectangle(
        window.innerWidth / 2, // 화면 중앙
        window.innerHeight / 2, // 바닥에 위치
        window.innerWidth,
        30,
        { isStatic: true },
      );
      const topLine = Matter.Bodies.rectangle(
        window.innerWidth / 2, // 화면 중앙
        15, // 상단에 위치
        window.innerWidth,
        30,
        { isStatic: true },
      );

      // 벽을 월드에 추가
      Matter.World.add(world, [leftWall, rightWall, ground, topLine]);

      // 단어 객체 생성 및 추가
      const wordBodies = createWordBodies();
      Matter.World.add(
        world,
        wordBodies.map(({ body }) => body),
      );

      // 마우스 컨스트레인트 추가
      const mouseConstraint = setupMouseConstraint(engine);
      Matter.World.add(world, mouseConstraint);

      // 물리 엔진 실행
      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // 렌더링 루프
      function rerender() {
        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          elem.style.top = `${y - elem.offsetHeight / 2}px`;
          elem.style.left = `${x - elem.offsetWidth / 2}px`;
          elem.style.transform = `rotate(${body.angle}rad)`;
        });
        requestAnimationFrame(rerender);
      }
      rerender();
    };

    // 단어 객체 생성
    const createWordBodies = () => {
      const elements = wordElementsRef.current;
      return elements.map(elem => {
        const width = elem.offsetWidth;
        const height = elem.offsetHeight;
        const body = Matter.Bodies.rectangle(
          window.innerWidth / 2, // 화면 중앙에서 생성

          window.innerHeight / 8, // 랜덤한 높이에서 생성
          width,
          height,
          {
            restitution: 0.8,
          },
        );

        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5, // 모바일에서는 속도 감소
          y: (Math.random() - 0.5) * 5,
        });
        Matter.Body.setAngularVelocity(
          body,
          (Math.random() - 0.5) * 0.05, // 각속도도 감소
        );

        return { body, elem };
      });
    };

    // 마우스 컨스트레인트 설정
    const setupMouseConstraint = engine => {
      if (textBoxRef.current) {
        const mouse = Matter.Mouse.create(textBoxRef.current);
        return Matter.MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: 0.2,
            render: { visible: false },
          },
        });
      }
    };

    // splitWords는 #contact가 뷰포트에 보일 때 실행
    splitWords();

    // 물리 엔진 초기화
    initializePhysics();

    // cleanup 함수
    return () => {
      if (runner) {
        Matter.Runner.stop(runner);
      }
      if (engine) {
        Matter.Engine.clear(engine);
      }
    };
  }, [isInViewport]); // isInViewport가 변경되면 useEffect 실행

  return (
    <section id="contact" ref={contactRef}>
      <div className="contact__inner">
        <h2 className="contact__title">Contact</h2>{' '}
        <div className="contact__lines top" aria-hidden="true">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div ref={textBoxRef} className="contact__text">
          <a href="mailto:audgml522@naver.com">email: audgml522@naver.com</a>
          <span>
            {' '}
            phone:{' '}
            <a href="tel:01071591823" className="number">
              010-7159-1823
            </a>
          </span>
          <span>
            {' '}
            homepage:{' '}
            <a href="https://may-portfolio.com" target="_blank" rel="noopener noreferrer">
              https://may-portfolio.com
            </a>
          </span>
          <span> address: 서울시 광진구 자양동</span>
        </div>
        <div className="contact__lines" aria-hidden="true">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
