import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './All.css';

const All = () => {
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

        // Sort by view_count in descending order
        updatedVideoStats.sort((a, b) => b.view_count - a.view_count);

        setVideoStats(updatedVideoStats);
      } catch (error) {
        console.error('Failed to fetch video stats:', error);
      }
    };

    fetchData();
  }, []);

  const fetchYouTubeThumbnail = async (videoId) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyAVs5_0ygD440T36Sb19rr-5arnkh_m_2I&part=snippet`);
      const thumbnailUrl = response.data.items[0].snippet.thumbnails.high.url;
      return thumbnailUrl;
    } catch (error) {
      console.error('Failed to fetch YouTube thumbnail:', error);
      return '';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  // Function to format view_count with commas
  const formatViewCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredVideoStats = selectedSinger
    ? videoStats.filter(video => video.singer === selectedSinger)
    : videoStats;

  return (
    <div>
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
            <div className="Asunup1">
              <div className="rank-number">{index + 1}</div>
            </div>
            <div className="Asunup2-1">
              <div className="video-name">
                <img src={video.thumbnailUrl} alt="video thumbnail" className="thumbnail-img"/>
              </div>
            </div>
            <div className="Asunup3-1">
              <div>{video.name}</div>
              <div className="singer">{video.singer}</div>
            </div>
            <div className="Asunup4-1">
              <div className="increases">{formatViewCount(video.view_count)}</div>
            </div>
            <div className="Asunup4-1">
              <div className="increases">{formatDate(video.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;
