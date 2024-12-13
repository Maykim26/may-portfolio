import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyles";
import ThemeToggle from "./components/ThemeToggle";
import ThemeContext from "./context/ThemeContext";
import HomeView from "./views/HomeView";
import MouseFollowEffect from "./components/MouseFollowEffect"; // 블롭 효과 추가
import smooth from "./utils/smooth";
import link from "./utils/link";

const App = () => {
	const { isDarkMode } = useContext(ThemeContext);

	// useEffect로 smooth 스크롤과 링크 처리
	useEffect(() => {
		smooth();
		link();
	}, []);

	return (
		<div
			className="App"
			style={{
				backgroundColor: "var(--mainBackground)",
				color: "var(--mainColor)",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<GlobalStyle />
			{/* MouseFollowEffect 렌더링 */}
			<MouseFollowEffect isDarkMode={isDarkMode} />

			<BrowserRouter basename="/may-portfolio">
				<Routes>
					<Route
						path="/"
						element={<HomeView />}
					/>
					{/* 추가적인 라우팅이 필요하다면 여기에 추가 */}
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
