// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/scss/style.scss";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
