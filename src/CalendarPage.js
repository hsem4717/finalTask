import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import './cal.css';
import CalendarComponent from './CalendarComponent';
import Header from './Header';
import SmallBox from './SmallBox';
import './Header.css'; // 필요한 스타일링이 있으면 이 파일에 추가
import './App.css';
import {fetchVideoData } from './VideoData';
function Home() {
  const [viewCounts, setViewCounts] = useState({});
  const [viewCountDifferences, setViewCountDifferences] = useState({});
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
              <CalendarComponent />
        </div>
      </header>
    </div>
  );
}

export default Home;

/*      import CalendarComponent from './CalendarComponent';    <CalendarComponent />*/