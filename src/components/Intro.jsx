import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { introText } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
	const [splitText, setSplitText] = useState([]);

	useEffect(() => {
		// 단어 하이라이트 리스트
		const highlightedWords = ["possimus", "perferendis", "dolore"];

		// 단어 단위 하이라이트 적용
		// const highlightWords = (text) => {
		// 	const words = text.split(" ");
		// 	return words.map((word, index) => {
		// 		const cleanWord = word.replace(
		// 			/[^a-zA-Z0-9]/g,
		// 			""
		// 		);
		// 		const isHighlighted = highlightedWords.includes(
		// 			cleanWord.toLowerCase()
		// 		);

		// 		// 하이라이트가 필요한 단어에 'highlighted' 클래스를 추가
		// 		return isHighlighted ? (
		// 			<span
		// 				key={index}
		// 				className="highlighted"
		// 			>
		// 				{word}
		// 			</span>
		// 		) : (
		// 			<span key={index}>{word}</span>
		// 		);
		// 	});
		// };

		// 텍스트를 문자 단위로 분리하여 JSX로 변환
		const splitLetters = (text) => {
			const newText = text.split("").map((letter, index) => {
				return letter === " " ? (
					<span key={index}> </span>
				) : (
					<span key={index} className="letter">
						{letter}
					</span>
				);
			});
			setSplitText(newText);
		};

		// 문자 애니메이션 적용
		const animateLetters = () => {
			const letterElements =
				document.querySelectorAll(".letter");
			const sectionTrigger =
				document.querySelector(".intro__inner");

			// GSAP 애니메이션 적용
			letterElements.forEach((letter, i) => {
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
						duration: 1.5,
						ease: "circ.inOut", // 자연스러운 감속
						scrollTrigger: {
							trigger: sectionTrigger,
							start: "top 0%", // intro 섹션의 20% 지점에서 애니메이션 시작
							end: "bottom 20%", // intro 섹션의 80% 지점에서 애니메이션 종료
							markers: true, // 디버깅용 마커 비활성화
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
		// highlightWords(text);
		splitLetters(text); // 문자 분리

		// 상태가 업데이트된 후 애니메이션을 실행하도록 바로 실행
		requestAnimationFrame(animateLetters); // requestAnimationFrame을 사용하여 애니메이션 실행
	}, []); // useEffect가 처음 실행될 때만 호출됨

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
