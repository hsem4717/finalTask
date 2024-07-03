import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './cal.css';
import ReservationModal from './ReservationModal'; // 모달 컴포넌트 import

// 예약 데이터를 가져오는 함수
async function fetchReservations(setReservations) {
  try {
    const response = await axios.get('http://localhost:3001/calendar');
    setReservations(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('예약 데이터 가져오기 오류:', error);
  }
}

function CalendarComponent() {
  const [date, setDate] = useState(new Date()); // 현재 날짜 상태
  const [reservations, setReservations] = useState([]); // 예약 데이터 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 열기 여부 상태
  const [selectedReservations, setSelectedReservations] = useState([]); // 선택된 날짜의 예약 상태

  useEffect(() => {
    fetchReservations(setReservations); // 예약 데이터 가져오기
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 10);
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const dayReservations = reservations.filter(reservation => reservation.date.slice(0, 10) === formattedDate);

      return (
        <div onClick={() => handleTileClick(formattedDate)}>
          <ul className="reservation-list">
            {dayReservations.slice(0, 1).map((reservation, index) => (
              <li key={index}>{reservation.task}</li>
            ))}
            {dayReservations.length > 1 && (
              <li>...</li>
            )}
          </ul>
        </div>
      );
    }
  };

  // 타일 클릭 시 모달 열기 및 선택된 날짜의 예약 데이터 설정
  const handleTileClick = (formattedDate) => {
    const dayReservations = reservations.filter(reservation => reservation.date.slice(0, 10) === formattedDate);
    setSelectedReservations(dayReservations);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={getTileContent}
      />
      <ReservationModal isOpen={modalOpen} closeModal={closeModal} reservations={selectedReservations} />
    </div>
  );
}

export default CalendarComponent;
