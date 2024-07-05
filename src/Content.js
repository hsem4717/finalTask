import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate import 하기
import './Content.css';
import Header from './Header';

const Content = () => {
  const { id } = useParams();
  const [noticeContent, setNoticeContent] = useState({});
  const navigate = useNavigate(); // useNavigate 훅 사용하기

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/content/${id}`);
        setNoticeContent(response.data);
      } catch (error) {
        console.error('공지사항 내용을 불러오는 데 실패했습니다:', error);
      }
    };
    fetchContent();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동하는 함수
  };

  return (
    <div className="notice-container">
      <Header />
      <div className="board">
        <div className="notice-title">
        <button onClick={handleGoBack} className="back-button">
            ← 이전화면
      </button>
          <p className="titi">{noticeContent.title}</p>
          <p className="auau">{noticeContent.author}</p>
        </div>
        <hr />
        <p className="notice-content">{noticeContent.content}</p>
      </div>
    </div>
  );
};

export default Content;
