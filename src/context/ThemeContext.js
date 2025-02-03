// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크 모드와 라이트 모드의 색상 변수 정의 (500까지 확장)
  const themeColors = {
    light: {
      '--mainBackground': '#f0f0f0',
      '--secondaryBackground': '#dcdcdc',
      '--mainColor': '#070707',
      '--secondaryColor': '#858585',
      '--accentColor': '#423fff',
      '--primaryColor': '#FFD700',
      '--subBg100': '#e0e0e0',
      '--subBg200': '#d0d0d0',
      '--subBg300': '#bcbcbc',
      '--subBg400': '#c7c7c7',
      '--subBg500': '#b0b0b0',
      '--black': '#000000',
      '--white': '#ffffff',
      '--textPrimary': '#333333',
      '--textSecondary': '#666666',
      '--borderColor': '#aaaaaa',
      '--shadowColor': 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      '--mainBackground': '#141414',
      '--secondaryBackground': '#2e2e2e',
      '--mainColor': '#dddddd',
      '--secondaryColor': '#aaaaaa',
      '--accentColor': '#423fff',
      '--primaryColor': '#FFD700',
      '--subBg100': '#1e1e1e',
      '--subBg200': '#292929',
      '--subBg300': '#383838',
      '--subBg400': '#4a4a4a',
      '--subBg500': '#5c5c5c',
      '--black': '#ffffff',
      '--white': '#000000',
      '--textPrimary': '#f5f5f5',
      '--textSecondary': '#cccccc',
      '--borderColor': '#444444',
      '--shadowColor': 'rgba(255, 255, 255, 0.1)',
    },
  };

  // 페이지 로드 시, 로컬스토리지에서 다크 모드 상태 확인
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // 다크 모드 변경 시, CSS 변수 적용
  useEffect(() => {
    const root = document.documentElement;
    const colors = isDarkMode ? themeColors.dark : themeColors.light;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // 로컬스토리지에 다크 모드 상태 저장
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
