// Home.js
import Header from './Header';
import SmallBox from './SmallBox';
import All from './All';
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
              <div className="Newsun3">조회수</div>
              <div className="NNewsun4">등록일</div>
              </div>
              <All />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

/*      import CalendarComponent from './CalendarComponent';    <CalendarComponent />*/