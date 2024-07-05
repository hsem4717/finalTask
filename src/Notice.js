import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './notice.css';
import { Link } from 'react-router-dom';

const Notice = () => {
  const [noticeStats, setNoticeStats] = useState([]);
  const [filteredNoticeStats, setFilteredNoticeStats] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notice-stats');
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setNoticeStats(sortedData);
        setFilteredNoticeStats(sortedData); // 초기 데이터로 필터링된 데이터 설정
      } catch (error) {
        console.error('Failed to fetch notice stats:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleAuthorSelect = (author) => {
    setSelectedAuthor(author);
    if (author === '') {
      setFilteredNoticeStats(noticeStats); // 모든 데이터를 보여줌
    } else {
      const filteredData = noticeStats.filter(notice => notice.author === author);
      setFilteredNoticeStats(filteredData); // 선택된 작성자의 데이터만 보여줌
    }
  };

  return (
  <div><div className="author-filter">
        <select value={selectedAuthor} onChange={(e) => handleAuthorSelect(e.target.value)}>
          <option value="">전체</option>
          {/* 작성자 목록을 동적으로 생성 */}
          {[...new Set(noticeStats.map(notice => notice.author))].map((author, index) => (
            <option key={index} value={author}>{author}</option>
          ))}
        </select>
      </div>
    <div className="rank-box">
      {filteredNoticeStats.slice().reverse().map((notice, index) => (
        <div className="rank-heade" key={notice.id}>
          <div className="sunu1">
            <div className="rank-number">
              <div>{filteredNoticeStats.length - index}</div>
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
            <div className="increase">{formatDate(notice.date_added)}</div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Notice;
