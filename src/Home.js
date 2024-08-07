// Home.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SmallBox from './SmallBox';
import Rank from './Rank';
import './Header.css'; // 필요한 스타일링이 있으면 이 파일에 추가
import './App.css';
import { fetchVideoData } from './VideoData';
function Home() {
  const [, setViewCounts] = useState({});
  const [, setViewCountDifferences] = useState({});
  const [, setSortedVideoIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { viewCounts, viewCountDifferences, sortedVideoIds } = await fetchVideoData();
        setViewCounts(viewCounts);
        setViewCountDifferences(viewCountDifferences);
        setSortedVideoIds(sortedVideoIds);
      } catch (error) {
        console.error('Failed to fetch initial video data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="backbody">
          <SmallBox />
          <div className="HHeader">
              <div className = "Rank_Header">
              <div className="sun1">순위</div>
              <div className="sun2">곡정보</div>
              <div className="sun3">조회수 증가량</div>
              <div className="sun4">조회수</div>
              </div>
              <Rank />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

/*      import CalendarComponent from './CalendarComponent';    <CalendarComponent />*/