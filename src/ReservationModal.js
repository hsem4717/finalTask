import React from 'react';
import './modal.css';

function ReservationModal({ isOpen, closeModal, reservations }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2 className="modalhaeder">상세 일정</h2>
        <ul>
          {reservations.map((reservation, index) => (
            <li key={index}>{reservation.task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReservationModal;
