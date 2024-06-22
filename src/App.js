// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import UploadPage from './UploadPage'; // 업로드 페이지 컴포넌트가 있다고 가정

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
