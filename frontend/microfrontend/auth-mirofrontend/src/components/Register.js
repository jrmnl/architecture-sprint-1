import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from "../utils/auth.js";
import { triggerInfoTooltop } from "mesto_ui_kit/InfoTooltip";

import "../index.css";

function Register ({ onRegistered }){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();

    auth
      .register(email, password)
      .then((res) => {
        triggerInfoTooltop("success", "Вы успешно зарегистрировались");
        onRegistered();
      })
      .catch((err) => {
        triggerInfoTooltop("fail", "Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Регистрация</h3>
          <label className="auth-form__input">
            <input type="text" name="email" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">Зарегистрироваться</button>
          <p className="auth-form__text">Уже зарегистрированы? <Link className="auth-form__link" to="/signin">Войти</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register;
