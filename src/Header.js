// Header.js
import React from 'react';
import { ReactComponent as Logo } from './Logo.svg';
import './Header.css'; // 필요한 스타일링이 있으면 이 파일에 추가

function Header() {
  return (
    <div className="head-f">
      <Logo className="logo" />
    </div>
  );
}

export default Header;


/*<Link to="/video/upload">
       <button className="custom-button">동영상 등록하기</button>
      </Link>*/