
const Tabs = ({ isLogin, onToggle }) => {
  return (
    <div className="auth-tabs">
      <button
        className={`auth-tabs__button ${isLogin ? 'auth-tabs__button--active' : ''}`}
        onClick={() => onToggle(true)}
      >
        Вход
      </button>
      <button
        className={`auth-tabs__button ${!isLogin ? 'auth-tabs__button--active' : ''}`}
        onClick={() => onToggle(false)}
      >
        Регистрация
      </button>
    </div>
  );
};

export default Tabs;