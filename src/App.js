// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import UploadPage from './UploadPage';
import NoticePage from './NoticePage'
import NewestPage from './NewestPage'
import Content from './Content';
import CalendarPage from './CalendarPage';
import './Header.css'; // 필요한 스타일링이 있으면 이 파일에 추가

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/upload" element={<UploadPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/content/:id" element={<Content />} />
          <Route path="/newest" element={<NewestPage />} />
          <Route path="/calendar" element={<CalendarPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
