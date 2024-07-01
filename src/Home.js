// Home.js

import React, { useState, useEffect } from 'react';
import Header from './Header';
import SmallBox from './SmallBox';
import Rank from './Rank';
import './App.css';
import { initialVideoTitles, initialOpts, fetchVideoData, fetchVideoStats } from './VideoData';

function Home() {
  const [viewCounts, setViewCounts] = useState({});
  const [viewCountDifferences, setViewCountDifferences] = useState({});
  const [sortedVideoIds, setSortedVideoIds] = useState([]);

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

  const handleRefresh = async () => {
    try {
      const { viewCounts, viewCountDifferences, sortedVideoIds } = await fetchVideoStats();
      setViewCounts(viewCounts);
      setViewCountDifferences(viewCountDifferences);
      setSortedVideoIds(sortedVideoIds);
    } catch (error) {
      console.error('Failed to fetch updated video stats:', error);
    }
  };

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
          <Rank videoData={videoData} opts={initialOpts} />
        </div>
      </header>
    </div>
  );
}

export default Home;
