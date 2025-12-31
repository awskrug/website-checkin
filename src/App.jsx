import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CheckInPage from './pages/CheckInPage';
import ResultPage from './pages/ResultPage';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 결과 페이지 */}
        <Route path="/:groupCode/:eventCode/result" element={<ResultPage />} />

        {/* 소모임 + 이벤트 코드 경로 */}
        <Route path="/:groupCode/:eventCode" element={<CheckInPage />} />

        {/* 소모임만 있는 경로 (eventCode 기본값 사용) */}
        <Route path="/:groupCode" element={<CheckInPage />} />

        {/* 기본 경로 - sls로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/sls" replace />} />

        {/* 404 - 기본 페이지로 */}
        <Route path="*" element={<Navigate to="/sls" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

