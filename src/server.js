const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const axios = require('axios');

app.use(cors({ origin: 'http://localhost:3000' }));

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'min071!!',
  database: 'study'
});

// YouTube API 키
const youtubeApiKey = 'AIzaSyArdwxcFkjfM_3SpKPRPF-Rn1rZ4OPIHBk';

// MySQL 연결
connection.connect(err => {
  if (err) {
    console.error('DB 연결 오류:', err);
    return;
  }
  console.log('MySQL 데이터베이스 연결 성공');
});

// YouTube API 호출을 위한 함수 정의
async function getVideoStats(videoId) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'statistics',
        id: videoId,
        key: youtubeApiKey
      }
    });

    const viewCount = parseInt(response.data.items[0].statistics.viewCount, 10);
    return viewCount;
  } catch (error) {
    console.error('YouTube API 호출 오류:', error);
    throw error;
  }
}

// 조회수 업데이트 함수
async function updateViewCounts() {
  try {
    // MySQL 쿼리: minute_stats 테이블에서 모든 데이터 가져오기
    const results = await new Promise((resolve, reject) => {
      connection.query('SELECT video_id, view_count FROM minute_stats', (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });

    // 비동기 처리를 위한 Promise 배열
    const promises = results.map(async (row) => {
      const videoId = row.video_id;
      const previousViewCount = row.view_count;

      try {
        const currentViewCount = await getVideoStats(videoId);
        console.log(`영상 ${videoId}의 조회수: ${currentViewCount}`);

        const increase = currentViewCount - previousViewCount;

        return new Promise((resolve, reject) => {
          connection.query(
            'UPDATE minute_stats SET view_count = ?, increase = ? WHERE video_id = ?',
            [currentViewCount, increase, videoId],
            (updateError, updateResults) => {
              if (updateError) {
                console.error(`영상 ${videoId}의 조회수 업데이트 실패:`, updateError);
                reject(updateError);
              } else {
                console.log(`영상 ${videoId}의 조회수가 ${increase} 증가했습니다.`);
                resolve();
              }
            }
          );
        });
      } catch (err) {
        console.error(`영상 ${videoId}의 조회수 가져오기 실패:`, err);
        throw err; // 혹은 처리 방식에 맞게 예외 처리
      }
    });

    await Promise.all(promises); // 모든 업데이트 작업이 완료될 때까지 기다립니다.
    console.log('모든 영상의 조회수 업데이트가 완료되었습니다.');
  } catch (error) {
    console.error('업데이트 과정에서 오류 발생:', error);
  }
}

// /video-stats 엔드포인트 정의
app.get('/video-stats', (req, res) => {
  // MySQL 쿼리: minute_stats 테이블에서 모든 데이터 가져오기
  connection.query('SELECT * FROM minute_stats', (error, results, fields) => {
    if (error) {
      console.error('쿼리 오류:', error);
      res.status(500).json({ error: '서버 내부 오류' });
      return;
    }

    // 조회수 데이터를 JSON 형식으로 반환
    res.json(results);
  });
});

app.get('/content/:id', (req, res) => {
  const noticeId = req.params.id;
  connection.query(`SELECT * FROM notice WHERE id = ${mysql.escape(noticeId)}`, (error, results, fields) => {
    if (error) {
      console.error('쿼리 오류:', error);
      res.status(500).json({ error: '서버 내부 오류' });
      return;
    }

    // 쿼리 결과가 있는 경우 결과를 JSON 형식으로 반환
    if (results.length > 0) {
      res.json(results[0]); // 첫 번째 결과만 반환 (단일 공지사항 조회라고 가정)
    } else {
      res.status(404).json({ error: '해당 ID의 공지사항을 찾을 수 없습니다.' });
    }
  });
});



app.get('/notice-stats', (req, res) => {
  // MySQL 쿼리: minute_stats 테이블에서 모든 데이터 가져오기
  connection.query('SELECT * FROM notice', (error, results, fields) => {
    if (error) {
      console.error('쿼리 오류:', error);
      res.status(500).json({ error: '서버 내부 오류' });
      return;
    }

    // 조회수 데이터를 JSON 형식으로 반환
    res.json(results);
  });
});

// 서버를 3001 포트에서 실행
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});

// 프로그램 종료 시 MySQL 연결 종료
process.on('SIGINT', () => {
  connection.end();
  console.log('프로그램 종료');
  process.exit();
});

// 서버 실행 시 조회수 업데이트 함수 호출
updateViewCounts();
