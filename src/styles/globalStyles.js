// src/styles/globalStyles.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* html과 body 전체에 대해 전환 효과 적용 */
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* body의 배경색과 텍스트 색상이 부드럽게 전환되도록 설정 */
  body {
    background-color: var(--mainBackground);
    color: var(--mainColor);
    font-family: Arial, sans-serif;
  }

  /* 박스와 버튼의 배경색도 전환되도록 설정 */
  .App {
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
`;
