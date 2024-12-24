import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/globalStyles';
import ThemeToggle from './components/ThemeToggle';
import ThemeContext from './context/ThemeContext';
import HomeView from './views/HomeView';
import MouseFollowEffect from './components/MouseFollowEffect';
import smooth from './utils/smooth';
import link from './utils/link';
import Loader from './components/Loader';

const App = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = () => {
    setLoading(false); // 로딩 완료 시 상태 업데이트
  };

  useEffect(() => {
    smooth();
    link();

    if (loading) {
      document.documentElement.classList.add('no-scroll'); // 로딩 중 스크롤 방지
      document.body.style.overflow = 'hidden'; // body에 overflow: hidden 추가
    } else {
      document.documentElement.classList.remove('no-scroll'); // 로딩 완료 후 스크롤 방지 해제
      document.body.style.overflow = ''; // body의 overflow 스타일 초기화
    }

    // 컴포넌트 언마운트 시에도 클래스 제거
    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.style.overflow = ''; // 언마운트 시에도 스타일 초기화
    };
  }, [loading]);

  return (
    <div className="App">
      <GlobalStyle /> {/* SVG 필터 정의 */}
      {/* 로딩 중일 때 로더 컴포넌트 표시 */}
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <MouseFollowEffect isDarkMode={isDarkMode} />
      <BrowserRouter basename="/may-portfolio">
        <Routes>
          <Route path="/" element={<HomeView />} />
          {/* 추가적인 라우팅이 필요하다면 여기에 추가 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
