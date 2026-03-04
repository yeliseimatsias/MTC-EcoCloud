// components/RegisterForm.jsx
import React from 'react';
import FormField from './FormField';
import CheckboxField from './CheckboxField';
import Button from './Button';

const RegisterForm = () => {
  return (
    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
      <FormField
        label="Имя и Фамилия"
        type="text"
        id="reg-name"
        placeholder="Иван Иванов"
      />
      <FormField
        label="Электронная почта"
        type="email"
        id="reg-email"
        placeholder="ivan@example.com"
      />
      <FormField
        label="Пароль"
        type="password"
        id="reg-password"
      />
      <FormField
        label="Подтвердите пароль"
        type="password"
        id="reg-confirm"
      />
      <FormField
        label="Название организации"
        type="text"
        id="reg-org"
        placeholder="ООО «Зелёные решения»"
        optional
      />
      <div className="auth-form__checkbox-group">
        <CheckboxField id="terms" label="Согласен с условиями" />
      </div>
      <div className="auth-form__actions">
        <Button variant="eco" type="submit">Зарегистрироваться</Button>
      </div>
    </form>
  );
};

export default RegisterForm;