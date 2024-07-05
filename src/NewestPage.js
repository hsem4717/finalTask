// Home.js
import Header from './Header';
import SmallBox from './SmallBox';
import Newest from './Newest';
import './NoticePage.css';
function Home() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="backbody">
          <SmallBox />
          <div className="HHeader">
              <div className = "Rank_Header">
              <div className="Newsun1">순위</div>
              <div className="Newsun2">곡정보</div>
              <div className="Newsun3">제목</div>
              <div className="Newsun4">등록일</div>
              </div>
              <Newest />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

/*      import CalendarComponent from './CalendarComponent';    <CalendarComponent />*/