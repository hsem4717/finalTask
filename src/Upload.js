import React, { useState } from 'react';
import axios from 'axios';
import './upload.css';

const Upload = () => {
  const [videoId, setVideoId] = useState('');
  const [name, setName] = useState('');
  const [singer, setSinger] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/upload-video-stats', {
        video_id: videoId,
        name: name,
        singer: singer,
        timestamp: timestamp
      });

      console.log('서버 응답:', response.data);
      alert('데이터가 성공적으로 저장되었습니다.');

      // 입력 필드 초기화
      setVideoId('');
      setName('');
      setSinger('');
      setTimestamp('');
    } catch (error) {
      console.error('데이터 전송 오류:', error); // 클라이언트 측 오류 로깅
      alert('데이터 전송 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className = "upAll">
      <h1 className="upload-heading">영상 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="videoId"> ID : </label>
          <input
            type="text"
            id="videoId"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="singer">가수:</label>
          <input
            type="text"
            id="singer"
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="timestamp">등록일:</label>
          <input
            type="date"
            id="timestamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
        </div>
        <button type="submit" className="button_up">저장</button>
      </form>
    </div>
  );
};

export default Upload;
