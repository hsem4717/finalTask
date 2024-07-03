import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Rank.css';

const Rank = () => {
  const [videoStats, setVideoStats] = useState([]);
  const [selectedSinger, setSelectedSinger] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/video-stats');
        const fetchedVideoStats = response.data;

        const updatedVideoStats = await Promise.all(
          fetchedVideoStats.map(async (video) => {
            const thumbnailUrl = await fetchYouTubeThumbnail(video.video_id);
            return { ...video, thumbnailUrl };
          })
        );

        updatedVideoStats.sort((a, b) => b.increase - a.increase);
        setVideoStats(updatedVideoStats);
      } catch (error) {
        console.error('Failed to fetch video stats:', error);
      }
    };

    fetchData();
  }, []);

  const fetchYouTubeThumbnail = async (videoId) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyArdwxcFkjfM_3SpKPRPF-Rn1rZ4OPIHBk&part=snippet`);
      const thumbnailUrl = response.data.items[0].snippet.thumbnails.high.url;
      return thumbnailUrl;
    } catch (error) {
      console.error('Failed to fetch YouTube thumbnail:', error);
      return ''; // Handle error gracefully
    }
  };

  const formatViewCount = (viewCount) => {
    return viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredVideoStats = selectedSinger
    ? videoStats.filter(video => video.singer === selectedSinger)
    : videoStats;

  return (
    <div className="rank_all">
      <div className="filter">
        <select onChange={(e) => setSelectedSinger(e.target.value)}>
          <option value="">전체</option>
          {[...new Set(videoStats.map(video => video.singer))].map(singer => (
            <option key={singer} value={singer}>{singer}</option>
          ))}
        </select>
      </div>
      <div className="rank-box">
        {filteredVideoStats.map((video, index) => (
          <div key={index} className="rank-header">
            <div className="sunup1">
              <div className="rank-number">{index + 1}</div>
            </div>
            <div className="sunup2">
              <div className="video-name">
                <img src={video.thumbnailUrl} alt="video thumbnail" className="thumbnail-img"/>
              </div>
            </div>
            <div className="sunup3">
              <div>{video.name}</div>
              <div className="singer">{video.singer}</div>
            </div>
            <div className="sunup4">
              <div className="increases">{video.increase}</div>
            </div>
            <div className="sunup5">
              <div className="increases">{formatViewCount(video.view_count)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rank;
