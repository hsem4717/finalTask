import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './Logo.svg';
import './UploadPage.css';

function Upload() {
  const [otherInfo, setOtherInfo] = useState('');

  const handleOtherInfoChange = (event) => {
    setOtherInfo(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otherInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }
  };

  return (
    <div className="upload-container">
      <Link to="/">
        <Logo className="logos"/>
      </Link>
      <input
        type="text"
        value={otherInfo}
        onChange={handleOtherInfoChange}
        className="styled-input"
      />
      <button
        onClick={handleSubmit}
        className="styled-button"
      >
        등록하기
      </button>
    </div>
  );
}

export default Upload;
