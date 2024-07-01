import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Rank.css';

const Rank = () => {
  const [videoStats, setVideoStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/video-stats');
        const fetchedVideoStats = response.data;

        // Fetch thumbnails for fetchedVideoStats
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
  }, []); // Empty dependency array ensures this effect runs only once

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

  return (
    <div className="rank-box">
      {videoStats.map((video, index) => (
        <div key={index} className="rank-header">
          <div className="sunup1">
            <div>순위</div>
            <div className="rank-number">{index + 1}</div>
          </div>
          <div className="sunup2">
            <div className = "description">곡정보</div>
            <div className="video-name">
              <img src={video.thumbnailUrl} alt="video thumbnail" className="thumbnail-img"/>
            </div>
          </div>
          <div className="sunup3">
            <div>제목</div>
            <div>{video.name}</div>
            <div className = "singer">{video.singer}</div>
          </div>
          <div className="sunup4">
            <div>증가량</div>
            <div className="increase">{video.increase}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rank;

/*
<div className="sunup3">
            <div>지난주 순위</div>
            <div className="last-week-rank">{video.last_week_rank}</div>
          </div>
          */