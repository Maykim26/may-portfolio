import React, { useState } from "react";
import { headerNav } from "../constants";

// MUI 아이콘 및 컴포넌트 임포트
import {
	HomeRounded,
	AssignmentIndRounded,
	LanRounded,
	DevicesRounded,
	PermContactCalendarRounded,
} from "@mui/icons-material";
import { Tooltip, Switch } from "@mui/material";

const Header = () => {
	const [darkMode, setDarkMode] = useState(false);

	const handleDarkModeToggle = () => {
		setDarkMode(!darkMode);
		// 여기에 다크 모드 스타일 적용 로직 추가 가능
	};

	const icons = {
		main: <HomeRounded />,
		about: <AssignmentIndRounded />,
		skills: <LanRounded />,
		project: <DevicesRounded />,
		contact: <PermContactCalendarRounded />,
	};

	return (
		<header id="header" role="banner">
			<div className="header__nav-container">
				<nav
					className="header__nav"
					role="navigation"
					aria-label="메인메뉴"
				>
					<ul>
						{headerNav.map((nav, key) => (
							<li key={key}>
								<Tooltip
									title={
										nav.title
									}
									arrow
								>
									<a
										href={
											nav.url
										}
									>
										{icons[
											nav.title.toLowerCase()
										] ||
											null}
									</a>
								</Tooltip>
							</li>
						))}
					</ul>
					{/* 다크모드 토글 */}
					<div className="header__darkmode-toggle">
						<Switch
							checked={darkMode}
							onChange={
								handleDarkModeToggle
							}
							color="primary"
						/>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
