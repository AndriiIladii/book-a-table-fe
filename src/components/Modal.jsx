//node modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// UI library
import { CloseOutlined } from "@ant-design/icons";

//styles
import * as styles from "../styles/Modal.module.css";

const Modal = ({ active, setActive, tableNumber }) => {
  const [tableName, setTableName] = useState("");
  const [guestCount, setGuestCount] = useState(0);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [birthday, setBirthday] = useState(false);
  const [notes, setNotes] = useState("");

  function closeModal() {
    setActive(false);
  }

  function addNewTable() {
    if (!tableName || !reservationDate) {
      alert("Name and Date are required!");
      return;
    }

    const newReservation = {
      id: Date.now(),
      name: tableName,
      tableNumber: tableNumber,
      guests: guestCount,
      date: reservationDate,
      time: reservationTime,
      tel: phoneNumber,
      holiday: birthday,
      comment: notes,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/reservations",
      data: newReservation,
    })
      .then((response) => {
        console.log(response.data);
        setActive(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      {active && (
        <div className={styles.modal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.tableNumber}>Table number: {tableNumber}</h2>
            <button className={styles.closeBtn} onClick={closeModal}>
              <CloseOutlined />
            </button>
            <form className={styles.modalForm}>
              <div className={styles.leftBlock}>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter guest name"
                    onChange={(e) => setTableName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Guest count</label>
                  <input
                    type="number"
                    placeholder="Enter guest count"
                    onChange={(e) => setGuestCount(e.target.value)}
                  />
                </div>
                <div>
                  <label>Booking date</label>
                  <input
                    type="date"
                    onChange={(e) => setReservationDate(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.rightBlock}>
                <div>
                  <label>Booking Time</label>
                  <input
                    type="time"
                    onChange={(e) => setReservationTime(e.target.value)}
                  />
                </div>
                <div>
                  <label>Phone number</label>
                  <input
                    type="tel"
                    placeholder="+380"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className={styles.checkboxWrapper}>
                  <label>
                    Has birthday
                    <input
                      type="checkbox"
                      onChange={(e) => setBirthday(e.target.checked)}
                    />
                    <span className={styles.checkbox}></span>
                  </label>
                </div>
              </div>
            </form>
            <div className={styles.commentary}>
              <label>Notes</label>
              <input
                type="text"
                placeholder="Enter special requests"
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={addNewTable}
                className={styles.formBtn}
                type="submit"
              >
                Add Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
