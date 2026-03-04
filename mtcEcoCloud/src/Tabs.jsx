

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="auth-tabs">
      <button
        className={`auth-tabs__button ${activeTab === 'login' ? 'auth-tabs__button--active' : ''}`}
        onClick={() => onTabChange('login')}
      >
        Вход
      </button>
      <button
        className={`auth-tabs__button ${activeTab === 'register' ? 'auth-tabs__button--active' : ''}`}
        onClick={() => onTabChange('register')}
      >
        Регистрация
      </button>
    </div>
  );
};

export default Tabs;