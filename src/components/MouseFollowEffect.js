import React, { useEffect } from 'react';

const MouseFollowEffect = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // 화면 너비가 768px 이하일 경우 모바일로 간주

    if (isMobile) return; // 모바일일 경우 코드 실행 중단

    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    // 마우스 위치 추적
    const getMouse = e => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', getMouse);

    // Blob 이동 클래스
    class MouseFollow {
      constructor(options) {
        Object.assign(this, options);
        this.pos = { x: 0, y: 0 };
      }

      follow() {
        this.distX = mouse.x - this.pos.x;
        this.distY = mouse.y - this.pos.y;

        this.pos.x += this.distX / (5 + this.ind * 0.5);
        this.pos.y += this.distY / (5 + this.ind * 0.5);

        this.el.style.transform = `translate(${
          this.pos.x - this.el.offsetWidth / 2
        }px, ${this.pos.y - this.el.offsetHeight / 2}px)`;
      }
    }

    const blobs = Array.from(document.querySelectorAll('#cursor .blob'));
    const blobFollows = blobs.map((el, ind) => new MouseFollow({ el, ind }));

    const render = () => {
      requestAnimationFrame(render);
      blobFollows.forEach(blob => blob.follow());
    };
    render();

    return () => window.removeEventListener('mousemove', getMouse);
  }, []);

  return (
    <div id="cursor" style={{ cursor: 'none' }}>
      <div className="blob"></div> {/* 첫 번째 blob */}
    </div>
  );
};

export default MouseFollowEffect;
