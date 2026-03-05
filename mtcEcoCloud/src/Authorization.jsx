import { useState } from 'react';
import './css/Authorization.css';
import Tabs from './Tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Authorization() {
  const [isLogin, setIsLogin] = useState(true); // true = форма входа, false = регистрация

  return (
    <>
    <div className="auth-page">
      <header className="auth-page__header">
        <h1 className="auth-page__header-title">MTC Cloud Services</h1>
        <div className="auth-page__header-subtitle">Вход / Регистрация в EcoCloud</div>
        <div className="auth-page__header-description">Управляйте экологичностью вашего облака</div>
      </header>

      <div className="auth-page__main">
        <section className="auth-page__section">
          <Tabs isLogin={isLogin} onToggle={setIsLogin} />
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </section>
      </div>
      
      <div style={{ height: '8px' }}></div>
    </div>
    </>
    
  );
}

export default Authorization;