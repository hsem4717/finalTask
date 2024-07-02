import axios from 'axios';

export const initialVideoTitles = {}; // 초기 값
export const initialOpts = {}; // 초기 값

export const fetchVideoData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/video-stats'); // 서버 URL 수정
    return response.data;
  } catch (error) {
    console.log('Failed to fetch video data:', error);
    throw error;
  }
};

export const fetchVideoStats = async () => {
  try {
    const response = await axios.get('http://localhost:3001/video-stats'); // 서버 URL 수정
    return response.data;
  } catch (error) {
    console.log('Failed to fetch video stats:', error);
    throw error;
  }
};


export const fetchNoticeData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/notice-stats'); // 서버 URL 수정
    return response.data;
  } catch (error) {
    console.log('Failed to fetch video data:', error);
    throw error;
  }
};

export const fetchNoticeStats = async () => {
  try {
    const response = await axios.get('http://localhost:3001/notice-stats'); // 서버 URL 수정
    return response.data;
  } catch (error) {
    console.log('Failed to fetch video stats:', error);
    throw error;
  }
};