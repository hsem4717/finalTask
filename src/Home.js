import React, { useState, useEffect } from 'react';
import Header from './Header';
import VideoList from './VideoList';
import SmallBox from './SmallBox'; // 작은 네모 컴포넌트를 import 합니다.
import Rank from './Rank'; // 작은 네모 컴포넌트를 import 합니다
import { ReactComponent as Logo } from './Logo.svg';
import './App.css';
import { initialVideoTitles, initialOpts, fetchVideoData } from './VideoData';

function Home() {
  const [viewCounts, setViewCounts] = useState({});
  const [viewCountDifferences, setViewCountDifferences] = useState({});
  const [sortedVideoIds, setSortedVideoIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { viewCounts, viewCountDifferences, sortedVideoIds } = await fetchVideoData();
      setViewCounts(viewCounts);
      setViewCountDifferences(viewCountDifferences);
      setSortedVideoIds(sortedVideoIds);
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
          <SmallBox text="작은 네모 컴포넌트" /> {/* 작은 네모 컴포넌트를 추가합니다. */}
          <Rank text="작은 네모 컴포넌트" /> {/* 작은 네모 컴포넌트를 추가합니다. */}
        </div>
      </header>
    </div>
  );
}

export default Home;
/*
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="chartType">전체 순위</div>
        <div className="backbody">
          <VideoList
            sortedVideoIds={sortedVideoIds}
            opts={initialOpts}
            videoTitles={initialVideoTitles}
            viewCounts={viewCounts}
            viewCountDifferences={viewCountDifferences}
          />
          <SmallBox text="작은 네모 컴포넌트" />
        </div>
      </header>
    </div>
  );
}

*/
