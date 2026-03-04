import { useState } from 'react'
 

function Authorization() {

  const [isLogin, setIsLogin] = useState(true); // true = форма входа, false = регистрация

  const toggleForm = (value) => {
    setIsLogin(value);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>MTC Cloud Services</h1>
        <div style={styles.headerSubtitle}>Вход / Регистрация в Green-Ops Оркестраторе</div>
        <div style={styles.headerDescription}>Управляйте экологичностью вашего облака</div>
      </header>

      <div style={styles.main}>
        <section style={styles.auth}>
      
          <div style={styles.tabs}>
            <button
              style={{...styles.tabButton, ...(isLogin && styles.activeTab)}}
              onClick={() => toggleForm(true)}
            >
              Вход
            </button>
            <button
              style={{...styles.tabButton, ...(!isLogin && styles.activeTab)}}
              onClick={() => toggleForm(false)}
            >
              Регистрация
            </button>
          </div>

          {isLogin && (
            <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="email">Электронная почта</label>
                <input style={styles.input} type="email" id="email" placeholder="ivan@example.com" />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="password">Пароль</label>
                <input style={styles.input} type="password" id="password" />
              </div>

              <div style={styles.checkboxGroup}>
                <div style={styles.checkbox}>
                  <input type="checkbox" id="remember" />
                  <label style={styles.checkboxLabel} htmlFor="remember">Запомнить меня</label>
                </div>
              </div>

              <div style={styles.actions}>
                <button style={{...styles.button, ...styles.buttonEco}} type="submit">Войти</button>
              </div>

              <div style={styles.forgot}>
                <a href="#" style={styles.link}>Забыли пароль?</a>
              </div>
            </form>
          )}

          {!isLogin && (
            <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="reg-name">Имя и Фамилия</label>
                <input style={styles.input} type="text" id="reg-name" placeholder="Иван Иванов" />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="reg-email">Электронная почта</label>
                <input style={styles.input} type="email" id="reg-email" placeholder="ivan@example.com" />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="reg-password">Пароль</label>
                <input style={styles.input} type="password" id="reg-password" />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="reg-confirm">Подтвердите пароль</label>
                <input style={styles.input} type="password" id="reg-confirm" />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="reg-org">
                  Название организации <span style={{ fontWeight: 400, color: '#7f8fa0' }}>(необязательно)</span>
                </label>
                <input style={styles.input} type="text" id="reg-org" placeholder="ООО «Зелёные решения»" />
              </div>

              <div style={styles.checkboxGroup}>
                <div style={styles.checkbox}>
                  <input type="checkbox" id="terms" />
                  <label style={styles.checkboxLabel} htmlFor="terms">Согласен с условиями</label>
                </div>
              </div>

              <div style={styles.actions}>
                <button style={{...styles.button, ...styles.buttonEco}} type="submit">Зарегистрироваться</button>
              </div>
            </form>
          )}
        </section>
      </div>
      <div style={{ height: '8px' }}></div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '1200px',
    width: '100%',
    background: '#1a1e24',
    borderRadius: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    margin: '0 auto',
    fontFamily: "'Inter', sans-serif",
    color: '#eef2f6',
  },
  header: {
    padding: '32px 40px 16px 40px',
    borderBottom: '1px solid #2e3740',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: '#a3e0c0',
    marginBottom: '4px',
  },
  headerSubtitle: {
    fontSize: '20px',
    fontWeight: 500,
    color: '#7acba0',
  },
  headerDescription: {
    fontSize: '15px',
    color: '#b0c4de',
    marginTop: '12px',
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '24px 40px 40px 40px',
    gap: '40px',
  },
  auth: {
    flex: '1 1 380px',
    minWidth: '320px',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '28px',
    borderBottom: '1px solid #2e3740',
  },
  tabButton: {
    padding: '10px 24px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#9aaec9',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    transition: '0.2s',
    outline: 'none',
  },
  activeTab: {
    color: '#eef2f6',
    borderBottomColor: '#e74c3c',
  },
  form: {
    display: 'block',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#cbd5e0',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    fontFamily: 'inherit',
    border: '1px solid #3a4552',
    borderRadius: '14px',
    background: '#262e38',
    color: '#f0f4fa',
    transition: '0.2s',
  },
  checkboxGroup: {
    margin: '20px 0 24px',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  },
  checkboxLabel: {
    fontSize: '15px',
    color: '#e0e7f0',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '8px',
  },
  button: {
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'inherit',
    border: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    transition: '0.15s',
    flex: '1 1 auto',
    minWidth: '200px',
    background: 'transparent',
    border: '1.5px solid transparent',
  },
  buttonEco: {
    background: '#e74c3c',
    color: '#ffffff',
    boxShadow: '0 8px 16px -6px rgba(231, 76, 60, 0.4)',
  },
  buttonPerformance: {
    background: 'transparent',
    borderColor: '#e74c3c',
    color: '#eef2f6',
  },
  forgot: {
    textAlign: 'right',
    marginTop: '8px',
  },
  link: {
    color: '#e74c3c',
    textDecoration: 'none',
    fontSize: '14px',
  },
  topology: {
    flex: '0 1 300px',
    background: '#252b33',
    borderRadius: '24px',
    padding: '24px',
    alignSelf: 'start',
  },
  topologyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#a3e0c0',
    marginBottom: '24px',
    letterSpacing: '-0.01em',
  },
  topologyItem: {
    background: '#1e2530',
    borderRadius: '20px',
    padding: '18px',
    marginBottom: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
  },
  topologyItemLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#9aaec9',
    marginBottom: '6px',
  },
  topologyItemValue: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#b3f0d0',
    lineHeight: '1.2',
  },
  small: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#8fa4bb',
    marginLeft: '6px',
  },
  note: {
    fontSize: '13px',
    color: '#5e7a8f',
    marginTop: '20px',
  },

}

export default Authorization
