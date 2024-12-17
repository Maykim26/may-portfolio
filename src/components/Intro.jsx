import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { introText } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
	const [splitText, setSplitText] = useState([]);

	useEffect(() => {
		// 텍스트를 문자 단위로 분리하여 JSX로 변환
		const splitLetters = (text) => {
			return text.split("").map((letter, index) => {
				return letter === " " ? (
					<span key={index}> </span>
				) : (
					<span key={index} className="letter">
						{letter}
					</span>
				);
			});
		};

		// 텍스트를 여러 줄로 나누고 각 줄을 JSX로 변환
		const splitLines = (text) => {
			const lines = text.split("\n"); // 줄바꿈을 기준으로 텍스트 분리
			return lines.map((line, index) => (
				<div key={index} className="text-line">
					{splitLetters(line)}{" "}
					{/* 각 줄의 문자를 분리하여 애니메이션 적용 */}
				</div>
			));
		};

		// 문자 애니메이션 적용
		const animateLetters = () => {
			const letterElements =
				document.querySelectorAll(".letter");
			const sectionTrigger =
				document.querySelector(".intro__inner");

			// GSAP 애니메이션 적용
			letterElements.forEach((letter) => {
				gsap.fromTo(
					letter,
					{
						x: 0,
						y: 0,
						rotation: 0,
					},
					{
						x: gsap.utils.random(-500, 500), // 시작 위치 X
						y: gsap.utils.random(
							-1100,
							500
						), // 시작 위치 Y
						rotation: gsap.utils.random(
							-138,
							187
						), // 회전 시작값
						duration: 5.5,
						ease: "circ.inOut", // 자연스러운 감속
						scrollTrigger: {
							trigger: sectionTrigger,
							start: "top 0%", // intro 섹션의 20% 지점에서 애니메이션 시작
							end: "bottom 80%", // intro 섹션의 80% 지점에서 애니메이션 종료
							markers: false, // 디버깅용 마커 비활성화
							scrub: 1, // 스크롤과 함께 애니메이션이 부드럽게 진행
							toggleActions:
								"restart none reverse none", // 섹션을 벗어나면 원위치로 돌아오도록 설정
						},
					}
				);
			});
		};

		// 텍스트 분리 및 애니메이션 실행
		const text = introText.title;
		setSplitText(splitLines(text)); // 텍스트를 줄바꿈하여 분리

		// `splitText`가 업데이트된 후 애니메이션을 실행하도록 설정
		const timer = setTimeout(() => {
			animateLetters(); // 애니메이션 실행
		}, 50); // 딜레이를 줄여 애니메이션이 더 빠르게 실행되도록

		// 컴포넌트 언마운트 시 애니메이션 타이머 클리어
		return () => clearTimeout(timer);
	}, []); // 컴포넌트가 처음 마운트될 때만 실행

	return (
		<section id="intro">
			<div className="intro__inner">
				<h2 className="intro__title">
					{/* splitText 배열을 렌더링하여 문자 애니메이션을 적용 */}
					<div className="text">{splitText}</div>
				</h2>
				<div
					className="intro__lines bottom"
					aria-hidden="true"
				>
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

export default Intro;
