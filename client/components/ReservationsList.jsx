//node modules
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { setReservation, deleteReservation } from "../store/ReservationSlice";
// UI library
import { DeleteOutlined } from "@ant-design/icons";
// images import
import terrace from "../images/terrace.jpg";
import rest from "../images/rest.jpg";
import logo from "../images/logo.png";
//styles
import * as styles from "../styles/Reservation.module.css";

const ReservationList = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservation.reservations);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/reservations",
    })
      .then((response) => {
        console.log(response.data);
        dispatch(setReservation(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const handleDelete = (reservationId) => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/reservations/${reservationId}`,
    })
      .then((response) => {
        console.log(response.data);
        dispatch(deleteReservation(reservationId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getImage = (tableNumber) => {
    if (tableNumber >= 401 && tableNumber <= 410) {
      return terrace;
    }
    return rest;
  };

  const locationOptions = [
    { value: "", label: "Всі бронювання" },
    { value: "restaurant", label: "Ресторан" },
    { value: "terrace", label: "Тераса" },
  ];

  const filteredReservations =
    selectedLocation && selectedLocation.value
      ? reservations.filter(
          (reservation) => reservation.location === selectedLocation.value
        )
      : reservations;

  return (
    <div className={styles.reservationContainer}>
      <Select
        className={styles.select}
        options={locationOptions}
        onChange={(option) => setSelectedLocation(option)}
        value={selectedLocation}
        isClearable
        placeholder="Виберіть локацію"
      />

      {filteredReservations.length > 0 ? (
        <ul className={styles.reservationCards}>
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className={styles.cardContent}>
              <li>
                <div className={styles.cardImg}>
                  <img src={getImage(reservation.tableNumber)} alt="location" />
                </div>
                <div className={styles.cardInfo}>
                  <p>Ім'я гостя: {reservation.name}</p>
                  <p>Номер столу: {reservation.tableNumber}</p>
                  <p>Час бронювання: {reservation.time}</p>
                </div>
                <div className={styles.btnWrapper}>
                  <Link
                    className={styles.cardBtn}
                    to={`/reservation/${reservation.id}`}
                  >
                    <button>Перевірити бронювання</button>
                  </Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(reservation.id);
                    }}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <div className={styles.noReserveWrapper}>
          <p className={styles.noReserve}>Бронювань немає.</p>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
      )}
    </div>
  );
};

export default ReservationList;
