//node modules
import React from "react";
import axios from "axios";
// UI library
import { CloseOutlined } from "@ant-design/icons";
import { message } from "antd";
import ReservationForm from "./ReservationForm";
//styles
import * as styles from "../styles/Modal.module.css";

const Modal = ({ active, setActive, tableNumber }) => {
  const [messageApi, contextHolder] = message.useMessage();

  function closeModal() {
    setActive(false);
  }

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Reservation added",
    });
  };

  const addNewTable = (data) => {
    const newReservation = {
      id: Date.now(),
      ...data,
      tableNumber,
    };

    axios({
      method: "POST",
      url: "http://192.168.31.72:5000/reservations",
      data: newReservation,
    })
      .then((response) => {
        console.log(response.data);
        success();
        setActive(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {contextHolder}
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
            <ReservationForm
              onSubmit={addNewTable}
              submitLabel="Add Reservation"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
