// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import UploadPage from './UploadPage';
import NoticePage from './NoticePage'
import Content from './Content';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/upload" element={<UploadPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/content/:id" element={<Content />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
