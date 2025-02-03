import React, { useEffect } from 'react';
import { aboutText } from '../constants'; // aboutText를 constants에서 가져옵니다.
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // GSAP 애니메이션
    // gsap.from(".title-left", {
    // 	y: 50,
    // 	opacity: 0,
    // 	duration: 1.5,
    // 	ease: "power3.out",
    // 	scrollTrigger: {
    // 		trigger: ".title-left",
    // 		start: "top 0%",
    // 		toggleActions: "play none none reverse",
    // 	},
    // });

    gsap.from('.txt-t2', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.txt-t2',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from('.txt-b2', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.txt-b2',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from('.row-sets .row', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.row-sets',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from('.link-btn', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.link-btn',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section id="about">
      <div className="content content-facilities half-half about__inner">
        <div className="row title-text-row">
          <div className="half">
            <span className="title-left txt-subtitle-3">
              <h2 className="about__title">About ME</h2>
            </span>
          </div>
          <div className="half">
            <div className="col ">
              <span className="txt-t2 ">{aboutText.intro}</span> <br></br>
              <span className="txt-b2">{aboutText.details}</span>
            </div>
          </div>
        </div>

        <div className="row title-text-row">
          <div className="half"></div>
          <div className="half col">
            <div className="row row-sets">
              <div className="row">
                <span className="num">01</span>
                <div className="col">
                  <span className="txt-subtitle-4">{aboutText.shopTitle}</span>
                  <div className="row txt-b3">
                    <span>{aboutText.shopDescription}</span>
                  </div>
                </div>
              </div>

              <div className="row">
                <span className="num">02</span>
                <div className="col">
                  <span className="txt-subtitle-4">{aboutText.fnbTitle}</span>
                  <div className="row txt-b3">
                    <span>{aboutText.fnbDescription}</span>
                  </div>
                </div>
              </div>

              <div className="row">
                <span className="num">03</span>
                <div className="col">
                  <span className="txt-subtitle-4">{aboutText.shuttleTitle}</span>
                  <div className="row txt-b3">
                    <span>{aboutText.shuttleDescription}</span>
                  </div>
                </div>
              </div>
            </div>

            <a className="link-btn" href="https://heather-cornflower-534.notion.site/15f83b89399780a1a270e8f2e2be62c0">
              <div className="btn-pill big stroke-black">
                <div className="btn-bg"></div>
                <span>이력서 보기</span>
                <svg
                  className="svg-arrow"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 16L26 16" strokeWidth="1.5"></path>
                  <path d="M18 8L26 16L18 24" strokeWidth="1.5"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll animation line */}
      {/* <div className="scroll">
				<div className="text">
					<span>Scroll</span>
					<div className="arrow"></div>
				</div>
				<div className="line"></div>
			</div> */}
    </section>
  );
};

export default About;
