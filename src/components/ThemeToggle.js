// src/components/ThemeToggle.js
import React, { useContext } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import ThemeContext from "../context/ThemeContext";

const ThemeToggle = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	return (
		<FormControlLabel
			control={
				<Switch
					checked={isDarkMode}
					onChange={toggleTheme}
					// 스위치 스타일을 원하는 대로 추가
					color="primary"
				/>
			}
			label={isDarkMode ? "Dark Mode" : "Light Mode"}
		/>
	);
};

export default ThemeToggle;
