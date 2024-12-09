import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/scss/style.scss";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider>
		<App /> {/* App.js에서 Router를 사용하도록 수정 */}
	</ThemeProvider>
);
