import React from 'react';
import './SmallBox.css'; // 필요한 스타일링 파일을 import 합니다.
import { ReactComponent as Logo1 } from './Group_61.svg';
import { ReactComponent as Logo2 } from './Group_63.svg';
import { ReactComponent as Logo3 } from './Group_64.svg';

const SmallBox = ({ text }) => {
  return (
    <div className="small-box">
    <Logo1 className="logos1" />
    <Logo2 className="logos2" />
    <Logo3 className="logos3" />
    </div>
  );
};

export default SmallBox;
