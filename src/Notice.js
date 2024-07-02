import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './notice.css';
import { Link } from 'react-router-dom';

const Notice = () => {
  const [noticeStats, setNoticeStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notice-stats');
        const sortedData = response.data.sort((a, b) => a.id - b.id); // id 기준으로 낮은 값이 위로 오도록 정렬
        setNoticeStats(sortedData);
      } catch (error) {
        console.error('Failed to fetch notice stats:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 사용하여 이 효과가 한 번만 실행되도록 설정

  const truncateTitle = (title) => {
    return title.length > 11 ? title.substring(0, 11) + '...' : title;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="rank-box">
      {noticeStats.slice().reverse().map((notice, index) => ( // 역순으로 순위 매기기
        <div className="rank-heade" key={notice.id}>
          <div className="sunu1">
            <div className="rank-number">
                <div>{noticeStats.length - index}</div> {/* 순위를 표시 */}
            </div>
          </div>
          <div className="sunu2">
            <div className="notice-name">
                <Link to={`/content/${notice.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                    {truncateTitle(notice.title)}
                </Link>
            </div>
          </div>
          <div className="sunu3">
            <div>{notice.author}</div>
          </div>
          <div className="sunu4">
            <div className="increase">{formatDate(notice.date_added)}</div> {/* 날짜를 포맷팅하여 출력 */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notice;
