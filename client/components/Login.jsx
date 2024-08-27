//node modules
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/ReservationSlice";
// UI library
import { CloseOutlined } from "@ant-design/icons";
//styles
import * as styles from "../styles/Login.module.css";

const Login = ({ loginActive, setLoginActive }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const closeModal = (e) => {
    e.preventDefault();
    setLoginActive(false);
  };

  const onSubmit = (data) => {
    const user = {
      password: data.password,
    };
    axios({
      method: "POST",
      url: "http://localhost:5000/users",
      data: user,
    })
      .then((response) => {
        console.log(response);
        dispatch(addUser(response.data.name));
        setLoginActive(false);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {loginActive && (
        <div className={styles.loginWrapper}>
          <div className={styles.loginContent}>
            <button className={styles.closeBtn} onClick={closeModal}>
              <CloseOutlined />
            </button>
            <form
              className={styles.loginForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>
                Password
                <input
                  type="password"
                  {...register("password", { required: "Enter a password!" })}
                />
              </label>
              <div>
                {errors?.password && (
                  <p className={styles.formError}>
                    {errors?.password?.message || "Error!"}
                  </p>
                )}
              </div>
              <button className={styles.submitBtn} type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
