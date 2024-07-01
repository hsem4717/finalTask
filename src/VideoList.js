// VideoList.js
import React from 'react';
import YouTube from 'react-youtube';
import './VideoList.css';

const VideoList = ({ videoData, opts }) => {
  return (
    <div className="video-list">
      {videoData.sortedVideoIds.map((videoId, index) => (
        <div className="video-item" key={videoId}>
          <span className="rank">{index + 1}</span>
          <YouTube videoId={videoId} opts={opts} />
          <p className="video-description">
            {videoData.videoTitles[videoId]}
            <br />
            조회수: {videoData.viewCounts[videoId]}
            <br />
            조회수 증가량: {videoData.viewCountDifferences[videoId]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
