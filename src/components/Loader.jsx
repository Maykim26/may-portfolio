import React, { useEffect } from "react";

const Loader = ({ number }) => {
	// number가 100이 될 때 스크롤 활성화
	useEffect(() => {
		if (number === 100) {
			document.body.style.overflow = "auto"; // body 스크롤 활성화
			document.documentElement.style.overflow = "auto"; // html 스크롤 활성화
		}
	}, [number]); // number 값이 변경될 때마다 실행

	// number가 10 미만일 때 앞에 0을 추가
	let numberString = number;
	if (number < 10) {
		numberString = "0" + number;
	}

	return (
		<div className="Loader" data-size={number}>
			{numberString}
			<sup>%</sup>
		</div>
	);
};

export default Loader;
