import React from "react";
import { useSelector } from "react-redux";
import rest from "../images/rest.jpg";
import * as styles from "../styles/Reservation.module.css";

const ReservationList = () => {
  const reservations = useSelector((state) => state.table.table);

  return (
    <div className={styles.reservationContainer}>
      {reservations && reservations.length > 0 ? (
        <ul className={styles.reservationCards}>
          {reservations.map((reservation, index) => (
            <div className={styles.cardContent}>
              <li key={index}>
                <div className={styles.cardImg}>
                  <img src={rest} alt="rest" />
                </div>
                <div className={styles.cardInfo}>
                  <p>Guest Name: {reservation.name}</p>
                  <p>Table number:{reservation.tableNumber}</p>
                  <p> Reservation Time:{reservation.time}</p>
                </div>
                <button className={styles.cardBtn}>View reservation</button>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p className={styles.noReserve}>No reservations available.</p>
      )}
    </div>
  );
};

export default ReservationList;
