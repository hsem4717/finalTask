import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Rank.css';

const Rank = () => {
  const [videoStats, setVideoStats] = useState([]);
  const [selectedSinger, setSelectedSinger] = useState('');

  useEffect(() => {
    fetchData();
  }, []); // 처음 한 번만 호출

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

  const fetchYouTubeThumbnail = async (videoId) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyAVs5_0ygD440T36Sb19rr-5arnkh_m_2I&part=snippet`);
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

  const handleUpdate = () => {
    axios.get('http://localhost:3001/update-video-stats')
      .then(() => {
        console.log('Video stats updated successfully');
        fetchData(); // 업데이트 후 데이터 다시 가져오기
      })
      .catch(error => {
        console.error('Failed to update video stats:', error);
      });
  };

  const filteredVideoStats = selectedSinger
    ? videoStats.filter(video => video.singer.includes(selectedSinger))
    : videoStats;

  // Create filtered options for dropdown, excluding singers with commas
  const filterDropdownOptions = [...new Set(videoStats.map(video => video.singer))]
    .filter(singer => !singer.includes(','));

  return (
    <div className="rank_all">
      <div className="filter">
        <select onChange={(e) => setSelectedSinger(e.target.value)}>
          <option value="">전체</option>
          {filterDropdownOptions.map(singer => (
            <option key={singer} value={singer}>{singer}</option>
          ))}
        </select>
        <button onClick={handleUpdate} className="styled-button">
         ↺
        </button>
      </div>
      <div className="rank-box">
        {filteredVideoStats.map((video, index) => (
          <div key={index} className="rank-header">
            <div className="sunup1">
              <div className="rank-number">{index + 1}</div>
            </div>
            <div className="sunup2">
              <div className="video-name">
                <a href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank" rel="noopener noreferrer">
                  <img src={video.thumbnailUrl} alt="video thumbnail" className="thumbnail-img"/>
                </a>
              </div>
            </div>
            <div className="sunup3">
              <div>
                <a href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {video.name}
                </a>
              </div>
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
