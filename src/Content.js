import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Content.css';
import Header from './Header';

const Content = () => {
  const { id } = useParams();
  const [noticeContent, setNoticeContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/content/${id}`);
        setNoticeContent(response.data);
      } catch (error) {
        console.error('Failed to fetch notice content:', error);
      }
    };
    fetchContent();
  }, [id]);

  return (
    <div class="notice-container">
    <Header />
    <div class = "board">
    <div class="notice-title">
        <p class="titi">{noticeContent.title}</p>
        <p class="auau">{noticeContent.author}</p>
    </div>
        <hr />
        <p class="notice-content">{noticeContent.content}</p>
    </div>
    </div>
  );
};

export default Content;
