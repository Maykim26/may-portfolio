import React, { useEffect } from "react";
import Matter from "matter-js";

const Contact = () => {
	useEffect(() => {
		const initializePhysics = () => {
			const textBox =
				document.querySelector(".contact__text");
			const textBoxRect = textBox.getBoundingClientRect();
			const engine = Matter.Engine.create();
			const world = engine.world;

			// contact__text 영역의 크기
			const bounds = {
				top: textBoxRect.top + window.scrollY,
				left: textBoxRect.left,
				right: textBoxRect.left + textBoxRect.width,
				bottom:
					textBoxRect.top +
					textBoxRect.height +
					window.scrollY,
			};

			// 상하좌우 벽 설정
			const walls = [
				Matter.Bodies.rectangle(
					(bounds.left + bounds.right) / 2,
					bounds.top,
					bounds.right - bounds.left,
					10,
					{ isStatic: true }
				),
				Matter.Bodies.rectangle(
					(bounds.left + bounds.right) / 2,
					bounds.bottom,
					bounds.right - bounds.left,
					10,
					{ isStatic: true }
				),
				Matter.Bodies.rectangle(
					bounds.left,
					(bounds.top + bounds.bottom) / 2,
					10,
					bounds.bottom - bounds.top,
					{ isStatic: true }
				),
				Matter.Bodies.rectangle(
					bounds.right,
					(bounds.top + bounds.bottom) / 2,
					10,
					bounds.bottom - bounds.top,
					{ isStatic: true }
				),
			];

			// 단어들을 물리 객체로 변환
			const wordElements = document.querySelectorAll(".word");
			wordElements.forEach((word) => {
				// 특정 로직을 통해 top, left 값 조정
				word.style.top = `${Math.random() * 100}%`;
				word.style.left = `${Math.random() * 100}%`;
			});

			const wordBodies = [...wordElements].map((elemRef) => {
				const width = elemRef.offsetWidth;
				const height = elemRef.offsetHeight;

				const body = Matter.Bodies.rectangle(
					bounds.left +
						(bounds.right - bounds.left) /
							2,
					bounds.top +
						(bounds.bottom - bounds.top) /
							2,
					width,
					height,
					{ render: { visible: false } }
				);

				Matter.Body.setVelocity(body, {
					x: (Math.random() - 0.5) * 10,
					y: (Math.random() - 0.5) * 10,
				});

				Matter.Body.setAngularVelocity(
					body,
					(Math.random() - 0.5) * 0.1
				);

				return {
					body,
					elem: elemRef,
					render() {
						const { x, y } =
							this.body.position;
						const width =
							this.elem.offsetWidth;
						const height =
							this.elem.offsetHeight;

						this.elem.style.top = `${
							y - height / 2
						}px`;
						this.elem.style.left = `${
							x - width / 2
						}px`;
						this.elem.style.transform = `rotate(${this.body.angle}rad)`;
					},
				};
			});

			// 물리 엔진에 벽과 단어 물리 객체 추가
			Matter.World.add(world, [
				...walls,
				...wordBodies.map((box) => box.body),
			]);

			// MouseConstraint 추가
			const mouse = Matter.Mouse.create(textBox);
			const mouseConstraint = Matter.MouseConstraint.create(
				engine,
				{
					mouse: mouse,
					constraint: {
						stiffness: 0.2,
						render: { visible: false },
					},
				}
			);

			Matter.World.add(world, mouseConstraint);

			// Matter.Runner 설정
			const runner = Matter.Runner.create();
			Matter.Runner.run(runner, engine);

			// 애니메이션을 계속해서 업데이트
			function rerender() {
				wordBodies.forEach((element) =>
					element.render()
				);
				Matter.Engine.update(engine);
				requestAnimationFrame(rerender);
			}
			rerender();
		};
		const splitWords = () => {
			const textNode =
				document.querySelector(".contact__text");
			const text = textNode.textContent;

			const newDomElements = text
				.split(" ")
				.map((word, index) => {
					const highlighted = [
						"CTdddO",
						"재미있게",
						"만든",
					].includes(word);
					const span =
						document.createElement("span");
					span.classList.add("word");
					if (highlighted) {
						span.classList.add(
							"highlighted"
						);
					}
					span.textContent = word;

					// 위치 값 랜덤화, 화면 내에서 벗어나지 않도록 제한
					const top = Math.random() * 50 + 20; // 20% ~ 70% 범위
					const left = Math.random() * 80 + 10; // 10% ~ 90% 범위
					const rotate =
						(Math.random() - 0.5) * 1.5; // -1.5 ~ 1.5 radians 범위

					span.style.top = `${top}px`;
					span.style.left = `${left}px`;
					span.style.transform = `rotate(${rotate}rad)`;

					return span;
				});

			textNode.innerHTML = ""; // 기존 내용 초기화
			newDomElements.forEach((span) =>
				textNode.appendChild(span)
			);
		};

		// 단어 분리 후 물리 엔진 초기화
		splitWords();
		initializePhysics();
	}, []);

	return (
		<section id="contact">
			<div className="contact__inner">
				<h2 className="contact__title">Contact</h2>
				<div
					className="contact__lines top"
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
				<div className="contact__text">
					Mang CTdddO Myssss thrill 팀이 만든
					최고의 혁신 프로젝트 입니다. 이 텍스트를
					드래그 하거나 스크롤하며 재미있게
					즐겨보세요!
				</div>
				<div
					className="contact__lines"
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

export default Contact;
