// videoData.js
import axios from 'axios';

// 초기 비디오 타이틀 데이터
export const initialVideoTitles = {
  'fgSXAKsq-Vo': 'RE:WIND',
  'rDFUl2mHIW4': 'KIDDING',
  'JY-gJkMuJ94': '겨울봄',
  'wyhwJnNpVJI': 'SUPER HERO',
  'i4SRH9jfUMQ': 'OVER',
};

// 초기 옵션 데이터
export const initialOpts = {
  height: '135',
  width: '220',
  playerVars: {
    autoplay: 0,
  },
};

// 조회수 포맷팅 함수
export const formatViewCounts = counts => {
  const formattedCounts = {};
  for (const key in counts) {
    if (counts.hasOwnProperty(key)) {
      formattedCounts[key] = addCommasToNumber(counts[key]);
    }
  }
  return formattedCounts;
};

// 조회수에 콤마 추가하는 함수
export const addCommasToNumber = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 비디오 데이터를 가져오는 비동기 함수
export const fetchVideoData = async () => {
  try {
    const [viewCountsResponse, viewCountDifferencesResponse] = await Promise.all([
      axios.get('http://localhost:3001/video/viewCounts'),
      axios.get('http://localhost:3001/video/viewCountDifferences'),
    ]);

    const formattedViewCounts = formatViewCounts(viewCountsResponse.data);
    const formattedViewCountDifferences = formatViewCounts(viewCountDifferencesResponse.data);

    const sortedIds = Object.keys(viewCountsResponse.data).sort((a, b) => viewCountDifferencesResponse.data[b] - viewCountDifferencesResponse.data[a]);

    return {
      viewCounts: formattedViewCounts,
      viewCountDifferences: formattedViewCountDifferences,
      sortedVideoIds: sortedIds,
    };
  } catch (error) {
    console.error('데이터를 불러오는 중 오류 발생:', error);
    return {
      viewCounts: {},
      viewCountDifferences: {},
      sortedVideoIds: [],
    };
  }
};
