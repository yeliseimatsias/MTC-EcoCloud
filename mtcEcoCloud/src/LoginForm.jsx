// components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';
import CheckboxField from './CheckboxField';
import Button from './Button';

const LoginForm = () => 
{
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
  e.preventDefault(); // предотвращает перезагрузку страницы

  if (!email || !password) {
    setMessage('Пожалуйста, заполните все поля');
    return;
  }

  setLoading(true);
  setMessage('');

  try {

    const url = new URL('http://127.0.0.1:8000/admin'); // уточните эндпоинт
    url.searchParams.append('email', email);
    url.searchParams.append('password', password);
    url.searchParams.append('remember', remember);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      if (data.success) {
        setMessage('Успешный вход!');

        console.log('Данные пользователя:', data.user);
       
      } 
      else {
        setMessage(data.message || 'Неверный email или пароль');
      }
    } 
    else {
      setMessage(data.message || 'Ошибка сервера');
    }
  } catch (error) {
    setMessage('Ошибка сети');
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <FormField
        label="Электронная почта"
        type="email"
        id="email"
        placeholder="ivan@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label="Пароль"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {message && <div className="auth-form__message">{message}</div>}

      <div className="auth-form__actions">
        <Button onClick={handleSubmit} variant="eco" type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </Button>
      </div>

      <div className="auth-form__forgot">
        <a href="#" className="auth-link">Забыли пароль?</a>
      </div>
    </form>
  );
};

export default LoginForm;