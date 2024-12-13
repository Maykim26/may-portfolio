import React, { useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import "../assets/scss/MouseFollowEffect.scss";

const MouseFollowEffect = () => {
	const { isDarkMode } = useContext(ThemeContext);

	useEffect(() => {
		const root = document.documentElement;

		// 다크 모드 색상 설정
		if (isDarkMode) {
			root.style.setProperty(
				"--secondaryBackground",
				"#111111"
			);
			root.style.setProperty("--secondaryColor", "#858585");
			root.style.setProperty("--mainBackground", "#141414");
			root.style.setProperty("--mainColor", "#dddddd");
		} else {
			root.style.setProperty(
				"--secondaryBackground",
				"#dcdcdc"
			);
			root.style.setProperty("--secondaryColor", "#858585");
			root.style.setProperty("--mainBackground", "#f0f0f0");
			root.style.setProperty("--mainColor", "#070707");
		}

		// 마우스 위치 추적
		let mouse = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		};
		const getMouse = (e) => {
			mouse = {
				x:
					e.clientX ||
					e.pageX ||
					(e.touches && e.touches[0]?.pageX) ||
					0,
				y:
					e.clientY ||
					e.pageY ||
					(e.touches && e.touches[0]?.pageY) ||
					0,
			};
		};
		["mousemove", "touchstart", "touchmove"].forEach((event) => {
			window.addEventListener(event, getMouse);
		});

		// MouseFollow 클래스
		class MouseFollow {
			constructor(options) {
				Object.assign(this, options);
				this.pos = { x: 0, y: 0 };
			}

			follow() {
				this.distX = mouse.x - this.pos.x;
				this.distY = mouse.y - this.pos.y;

				this.velX = Math.abs(this.distX / 8);
				this.velY = Math.abs(this.distY / 8);

				this.pos.x +=
					this.distX / (10 + this.ind * 0.8);
				this.pos.y +=
					this.distY / (10 + this.ind * 0.8);

				this.scaleX = map(this.velX, 0, 100, 1, 2);
				this.scaleY = map(this.velY, 0, 100, 1, 2);

				// 블롭을 마우스 위치에 정확히 맞추고, 크기를 적용합니다.
				this.el.style.transform = `translate(${
					this.pos.x - this.el.offsetWidth / 2
				}px, ${
					this.pos.y - this.el.offsetHeight / 2
				}px) scale(${Math.max(
					this.scaleX,
					this.scaleY
				)})`;
			}
		}

		// Map 함수
		const map = (num, in_min, in_max, out_min, out_max) => {
			return (
				((num - in_min) * (out_max - out_min)) /
					(in_max - in_min) +
				out_min
			);
		};

		// 초기화
		const blobs = Array.from(
			document.querySelectorAll("#cursor .blob")
		);
		const blobFollows = blobs.map(
			(el, ind) => new MouseFollow({ el, ind })
		);

		// 애니메이션 렌더링
		const render = () => {
			requestAnimationFrame(render);
			blobFollows.forEach((blob) => blob.follow());
		};
		render();

		return () => {
			// 이벤트 리스너 제거
			["mousemove", "touchstart", "touchmove"].forEach(
				(event) => {
					window.removeEventListener(
						event,
						getMouse
					);
				}
			);
		};
	}, [isDarkMode]);

	return (
		<div id="cursor" style={{ cursor: "none" }}>
			<div className="blob"></div>
			<div className="blob"></div>
			<div className="blob"></div>
			<div className="blob"></div>

			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="goo">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="10"
							result="my-blur"
						/>
						<feColorMatrix
							in="my-blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
							result="my-gooey"
						/>
					</filter>
				</defs>
			</svg>
		</div>
	);
};

export default MouseFollowEffect;
