import React from 'react';
import './SmallBox.css'; // 필요한 스타일링 파일을 import 합니다.
import { ReactComponent as Logo1 } from './Group_61.svg';
import { ReactComponent as Logo2 } from './Group_63.svg';
import { ReactComponent as Logo3 } from './Group_64.svg';
import { Link } from 'react-router-dom';

const SmallBox = ({ text }) => {
  return (
    <div className="small-box">
    <Link to="/">
      <Logo1 className="logos1" />
    </Link>
      <Link to="/notice">
        <Logo2 className="logos2" />
      </Link>
      <Logo3 className="logos3" />
    </div>
  );
};

export default SmallBox;
