// VideoList.js
import React from 'react';
import YouTube from 'react-youtube';
import './VideoList.css';

const VideoList = ({ sortedVideoIds, opts, videoTitles, viewCounts, viewCountDifferences }) => {
  return (
    <div className="video-list">
      {sortedVideoIds.map((videoId, index) => (
        <div className="video-item" key={videoId}>
          <span className="rank">{index + 1}</span>
          <YouTube videoId={videoId} opts={opts} />
          <p className="video-description">
            {videoTitles[videoId]}
            <br />
            조회수: {viewCounts[videoId]}
            <br />
            조회수 증가량: {viewCountDifferences[videoId]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
