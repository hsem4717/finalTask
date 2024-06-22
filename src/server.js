const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql');

const app = express();

// CORS 미들웨어 추가
app.use(cors());
app.use(bodyParser.json()); // JSON 형식의 요청 본문을 파싱하기 위해 추가

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'min071!!',
  database: 'study'
});

// MySQL 연결
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// MySQL 테이블 생성
connection.query(`CREATE TABLE IF NOT EXISTS youtube_view_differences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  video_id VARCHAR(255),
  view_count_difference INT,
  timestamp DATETIME
)`, (err, result) => {
  if (err) {
    console.error('Error creating MySQL table:', err);
  } else {
    console.log('MySQL table created or already exists');
  }
});

// 서버에서 데이터 받아서 DB에 저장
app.post('/upload', async (req, res) => {
  try {
    const { otherInfo } = req.body;

    connection.query('INSERT INTO your_table_name (other_info) VALUES (?)', [otherInfo], (err, result) => {
      if (err) {
        console.error('Error saving data to MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log('Data saved to MySQL:', result.affectedRows, 'rows affected');
      res.status(200).json({ message: 'Data saved successfully' });
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// YouTube API 키
const API_KEY = 'AIzaSyAVs5_0ygD440T36Sb19rr-5arnkh_m_2I';

// 이전 조회수를 저장할 객체
const prevViewCounts = {};

// MySQL에 조회수 증가량 저장
function saveViewCountDifferences(viewCountDifferences) {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const values = Object.keys(viewCountDifferences).map(videoId => [videoId, viewCountDifferences[videoId], timestamp]);

  connection.query('INSERT INTO youtube_view_differences (video_id, view_count_difference, timestamp) VALUES ?', [values], (err, result) => {
    if (err) {
      console.error('Error saving view count differences to MySQL:', err);
    } else {
      console.log('View count differences saved to MySQL:', result.affectedRows, 'rows affected');
    }
  });
}

// 1분마다 실행되는 함수
async function updateViewCounts() {
  try {
    const viewCounts = await fetchViewCounts();
    console.log('Fetched view counts:', viewCounts);

    // 이전 조회수와 비교하여 차이를 저장할 객체
    const viewCountDifferences = {};

    // 이전 조회수와 비교하여 차이 출력
    Object.keys(viewCounts).forEach(videoId => {
      const diff = viewCounts[videoId] - (prevViewCounts[videoId] || 0);
      console.log(`Video ${videoId} views increased by:`, diff);
      viewCountDifferences[videoId] = diff;
    });

    // 현재 조회수를 이전 조회수로 설정
    Object.assign(prevViewCounts, viewCounts);

    // MySQL에 조회수 증가량 저장 전에 기존 데이터 삭제
    clearOldData();

    // MySQL에 조회수 증가량 저장
    saveViewCountDifferences(viewCountDifferences);
  } catch (error) {
    console.error('Error updating view counts:', error);
  }
}

// MySQL에서 이전 데이터 삭제
function clearOldData() {
  connection.query('DELETE FROM youtube_view_differences', (err, result) => {
    if (err) {
      console.error('Error clearing old data:', err);
    } else {
      console.log('Old data cleared from MySQL:', result.affectedRows, 'rows affected');
    }
  });
}

// 5분
setInterval(updateViewCounts, 300000);
// MySQL에 조회수 저장
function saveViewCounts(viewCounts) {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const values = Object.keys(viewCounts).map(videoId => [videoId, viewCounts[videoId], timestamp]);

  connection.query('INSERT INTO youtube_views (video_id, view_count, timestamp) VALUES ?', [values], (err, result) => {
    if (err) {
      console.error('Error saving view counts to MySQL:', err);
    } else {
      console.log('View counts saved to MySQL:', result.affectedRows, 'rows affected');
    }
  });
}

// YouTube 동영상 조회수 가져오기
async function fetchViewCounts() {
  try {
    const videoIds = ['fgSXAKsq-Vo', 'rDFUl2mHIW4', 'JY-gJkMuJ94', 'wyhwJnNpVJI', 'i4SRH9jfUMQ'];
    const viewCounts = {};

    for (const videoId of videoIds) {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=statistics`);
      viewCounts[videoId] = parseInt(response.data.items[0].statistics.viewCount);
    }

    return viewCounts;
  } catch (error) {
    console.error('Error fetching view counts:', error);
    throw error;
  }
}

app.get('/video/viewCountDifferences', async (req, res) => {
  try {
    connection.query('SELECT * FROM youtube_view_differences', (err, rows) => {
      if (err) {
        console.error('Error fetching view count differences from MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const viewCountDifferences = {};
      for (const row of rows) {
        viewCountDifferences[row.video_id] = row.view_count_difference;
      }

      res.json(viewCountDifferences);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/video/viewCounts', async (req, res) => {
  try {
   const videoIds = ['fgSXAKsq-Vo', 'rDFUl2mHIW4', 'JY-gJkMuJ94', 'wyhwJnNpVJI', 'i4SRH9jfUMQ'];
    const viewCounts = {};

    for (const videoId of videoIds) {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=statistics`);
      viewCounts[videoId] = response.data.items[0].statistics.viewCount;
    }

    res.json(viewCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
