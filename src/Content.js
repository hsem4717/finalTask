import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Content.css';

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
        <h2 class="notice-title">{noticeContent.title}</h2>
        <hr />
        <p class="notice-content">{noticeContent.content}</p>
    </div>
  );
};

export default Content;
