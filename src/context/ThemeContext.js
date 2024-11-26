// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// 페이지 로드 시, 로컬스토리지에서 다크 모드 상태를 확인
	useEffect(() => {
		const savedMode = localStorage.getItem("darkMode");
		if (savedMode === "true") {
			setIsDarkMode(true);
		}
	}, []);

	// 다크 모드 변경 시, CSS 변수 적용
	useEffect(() => {
		const root = document.documentElement;
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

		// 로컬스토리지에 다크 모드 상태 저장
		localStorage.setItem("darkMode", isDarkMode);
	}, [isDarkMode]);

	const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
