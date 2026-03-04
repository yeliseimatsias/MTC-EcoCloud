import { useState } from 'react'
import './index.css'

function Registration() {

  return (
     <div className="page">
  <header className="header">
    <h1 className="header__title">MTC Cloud Services</h1>
    <div className="header__subtitle">Регистрация в Green-Ops Оркестраторе</div>
    <div className="header__description">Начните свой путь к экологически эффективному облаку</div>
  </header>

  <div className="main">
    <section className="registration">
      <form className="form" action="#" method="post">
        <div className="form__field">
          <label className="form__label" htmlFor="name">Имя и Фамилия</label>
          <input className="form__input" type="text" id="name" name="fullname" placeholder="Иван Иванов" />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="email">Электронная почта</label>
          <input className="form__input" type="email" id="email" name="email" placeholder="ivan@example.com" />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="password">Пароль</label>
          <input className="form__input" type="password" id="password" name="password" />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="confirm">Подтвердите пароль</label>
          <input className="form__input" type="password" id="confirm" name="confirm_password" />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="org">
            Название организации <span style={{ fontWeight: 400, color: '#6b7f90' }}>(необязательно)</span>
          </label>
          <input className="form__input" type="text" id="org" name="organization" placeholder="ООО «Зелёные решения»" />
        </div>

        <div className="form__checkbox-group">
          <div className="form__checkbox">
            <input type="checkbox" id="terms" name="terms" />
            <label className="form__checkbox-label" htmlFor="terms">Согласен с условиями</label>
          </div>
          <div className="form__checkbox">
            <input type="checkbox" id="newsletter" name="newsletter" />
            <label className="form__checkbox-label" htmlFor="newsletter">Согласен на рассылку</label>
          </div>
        </div>

        <div className="form__actions">
          <button className="button button--eco" type="submit">Зарегистрироваться</button>
        </div>
      </form>
    </section>
  </div>
  <div style={{ height: '8px' }}></div>
    </div>
  )
}

export default Registration