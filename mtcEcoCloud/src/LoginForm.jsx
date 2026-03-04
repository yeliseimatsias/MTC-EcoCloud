// components/LoginForm.jsx
import React from 'react';
import FormField from './FormField';
import CheckboxField from './CheckboxField';
import Button from './Button';

const LoginForm = () => {
  return (
    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
      <FormField
        label="Электронная почта"
        type="email"
        id="email"
        placeholder="ivan@example.com"
      />
      <FormField
        label="Пароль"
        type="password"
        id="password"
      />
      <div className="auth-form__checkbox-group">
        <CheckboxField id="remember" label="Запомнить меня" />
      </div>
      <div className="auth-form__actions">
        <Button variant="eco" type="submit">Войти</Button>
      </div>
      <div className="auth-form__forgot">
        <a href="#" className="auth-link">Забыли пароль?</a>
      </div>
    </form>
  );
};

export default LoginForm;