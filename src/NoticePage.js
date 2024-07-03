// Home.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SmallBox from './SmallBox';
import './NoticePage.css';
import { initialVideoTitles, initialOpts, fetchVideoData } from './VideoData';
import Notice from './Notice'
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

  const videoData = {
    viewCounts,
    viewCountDifferences,
    videoTitles: initialVideoTitles,
  };

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="backbody">
          <SmallBox />
          <div className="HHeader">
              <div className = "Rank_Header">
              <div className="Nsun1">공지번호</div>
              <div className="Nsun2">제목</div>
              <div className="Nsun3">작성자</div>
              <div className="Nsun4">등록일</div>
              </div>
              <Notice videoData={videoData} opts={initialOpts} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
