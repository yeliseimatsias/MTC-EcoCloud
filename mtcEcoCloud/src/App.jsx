import { useState, useEffect, useRef } from "react";

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

const GlowTree = () => (
  <svg viewBox="0 535 800 1850" style={{ width: "400%", height: "800%" }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="strongGlow">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Ground glow */}
    <ellipse cx="200" cy="460" rx="120" ry="20" fill="url(#glowGrad)" />

    {/* Roots */}
    {[
      "M200,420 Q160,440 130,460", "M200,420 Q180,445 170,465",
      "M200,420 Q200,445 200,465", "M200,420 Q220,445 230,465",
      "M200,420 Q240,440 270,458",
    ].map((d, i) => (
      <path key={i} d={d} stroke="#16a34a" strokeWidth="2.5" fill="none" filter="url(#glow)"
        style={{ animation: `pulse ${1.5 + i * 0.2}s ease-in-out infinite alternate` }} />
    ))}

    {/* Trunk */}
    <path d="M200,420 Q195,360 200,290" stroke="#22c55e" strokeWidth="8" fill="none" filter="url(#strongGlow)" />

    {/* Main branches */}
    {[
      "M200,350 Q160,320 130,290", "M200,350 Q240,320 270,290",
      "M200,320 Q170,285 155,260", "M200,320 Q230,285 245,260",
      "M200,300 Q185,265 180,240", "M200,300 Q215,265 220,240",
    ].map((d, i) => (
      <path key={i} d={d} stroke="#22c55e" strokeWidth={3 - i * 0.3} fill="none" filter="url(#glow)"
        style={{ animation: `sway ${2 + i * 0.3}s ease-in-out infinite alternate` }} />
    ))}

    {/* Leaves cluster */}
    {[
      [200, 210, 80], [155, 230, 55], [245, 230, 55],
      [175, 190, 45], [225, 190, 45], [200, 175, 65],
      [140, 250, 40], [260, 250, 40],
    ].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r}
        fill={i % 3 === 0 ? "rgba(21,128,61,0.7)" : i % 3 === 1 ? "rgba(34,197,94,0.5)" : "rgba(74,222,128,0.35)"}
        filter="url(#glow)"
        style={{ animation: `breathe ${2.5 + i * 0.4}s ease-in-out infinite alternate` }} />
    ))}

    {/* Glowing leaf tips */}
    {[
      [130, 245], [270, 245], [175, 170], [225, 170],
      [155, 200], [245, 200], [200, 155],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="4" fill="#86efac" filter="url(#strongGlow)"
        style={{ animation: `twinkle ${1 + i * 0.3}s ease-in-out infinite alternate` }} />
    ))}

    {/* Circuit lines at base */}
    {[
      "M200,445 L160,455 L155,455", "M200,445 L240,455 L245,455",
      "M200,450 L200,462", "M160,455 L150,465",
      "M240,455 L250,465",
    ].map((d, i) => (
      <path key={i} d={d} stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.6"
        style={{ animation: `pulse ${1.8 + i * 0.25}s ease-in-out infinite alternate` }} />
    ))}

    <style>{`
      @keyframes pulse { from { opacity: 0.4; } to { opacity: 1; } }
      @keyframes sway { from { transform: rotate(-1deg); } to { transform: rotate(1deg); } }
      @keyframes breathe { from { transform: scale(0.97); opacity: 0.7; } to { transform: scale(1.03); opacity: 1; } }
      @keyframes twinkle { from { opacity: 0.3; r: 3; } to { opacity: 1; r: 5; } }
    `}</style>
  </svg>
);

const InputField = ({ placeholder, type = "text", value, onChange, rightIcon }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "14px" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "14px 16px",
          paddingRight: rightIcon ? "46px" : "16px",
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${focused ? "rgba(74,222,128,0.7)" : "rgba(255,255,255,0.15)"}`,
          borderRadius: "8px",
          color: "#e2e8f0",
          fontSize: "14px",
          fontFamily: "'Exo 2', sans-serif",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.25s ease",
          boxShadow: focused ? "0 0 0 3px rgba(74,222,128,0.12), inset 0 0 20px rgba(74,222,128,0.05)" : "none",
          backdropFilter: "blur(8px)",
        }}
      />
      {rightIcon && (
        <div style={{
          position: "absolute", right: "14px", top: "50%",
          transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", cursor: "pointer",
        }}>
          {rightIcon}
        </div>
      )}
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", top: "24px", right: "24px", zIndex: 1000,
      background: type === "success" ? "rgba(21,128,61,0.95)" : "rgba(185,28,28,0.95)",
      border: `1px solid ${type === "success" ? "#22c55e" : "#ef4444"}`,
      borderRadius: "10px", padding: "14px 20px", color: "#fff",
      fontFamily: "'Exo 2', sans-serif", fontSize: "14px",
      boxShadow: `0 0 30px ${type === "success" ? "rgba(74,222,128,0.3)" : "rgba(239,68,68,0.3)"}`,
      animation: "slideIn 0.3s ease",
      maxWidth: "320px",
    }}>
      {message}
      <style>{`@keyframes slideIn { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }`}</style>
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div style={{
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 500, backdropFilter: "blur(4px)",
  }} onClick={onClose}>
    <div style={{
      background: "rgba(10,20,10,0.97)",
      border: "1px solid rgba(74,222,128,0.3)",
      borderRadius: "16px", padding: "32px", maxWidth: "480px", width: "90%",
      boxShadow: "0 0 60px rgba(74,222,128,0.15)",
      animation: "popIn 0.25s ease",
    }} onClick={e => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ color: "#4ade80", fontFamily: "'Exo 2', sans-serif", fontSize: "18px", margin: 0 }}>{title}</h3>
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.5)",
          cursor: "pointer", fontSize: "20px", lineHeight: 1,
        }}>✕</button>
      </div>
      <div style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Exo 2', sans-serif", fontSize: "13px", lineHeight: 1.7 }}>
        {children}
      </div>
      <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  </div>
);

export default function EcoCloudApp() {
  const [page, setPage] = useState("register"); // register | login | dashboard
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedMailing, setAgreedMailing] = useState(false);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", confirm: "", org: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleRegister = () => {
    if (!regForm.name.trim()) return showToast("Введите имя и фамилию", "error");
    if (!regForm.email.includes("@")) return showToast("Введите корректный email", "error");
    if (regForm.password.length < 6) return showToast("Пароль должен быть не менее 6 символов", "error");
    if (regForm.password !== regForm.confirm) return showToast("Пароли не совпадают", "error");
    if (!agreedTerms) return showToast("Необходимо согласиться с условиями", "error");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({ name: regForm.name, email: regForm.email, org: regForm.org });
      setPage("dashboard");
      showToast(`Добро пожаловать в EcoCloud, ${regForm.name.split(" ")[0]}!`);
    }, 1400);
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) return showToast("Заполните все поля", "error");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({ name: loginForm.email.split("@")[0], email: loginForm.email, org: "" });
      setPage("dashboard");
      showToast("Вход выполнен успешно!");
    }, 1200);
  };

  const bg = {
    position: "fixed", inset: 0,
    background: "radial-gradient(ellipse at 70% 40%, rgba(21,78,21,0.45) 0%, rgba(5,20,5,0.0) 60%), radial-gradient(ellipse at 20% 80%, rgba(14,50,14,0.3) 0%, transparent 50%), #0a0f0a",
    zIndex: -1,
  };

  const cardStyle = {
    background: "rgba(8,16,8,0.82)",
    border: "1px solid rgba(74,222,128,0.18)",
    borderRadius: "18px",
    backdropFilter: "blur(24px)",
    boxShadow: "0 8px 60px rgba(0,0,0,0.6), 0 0 80px rgba(34,197,94,0.07)",
    padding: "40px 44px",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  };

  const btnStyle = (active = true) => ({
    width: "100%",
    padding: "15px",
    background: active ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" : "rgba(220,38,38,0.4)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "16px",
    fontFamily: "'Exo 2', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.5px",
    cursor: active ? "pointer" : "default",
    marginTop: "8px",
    boxShadow: active ? "0 4px 20px rgba(220,38,38,0.4), 0 0 40px rgba(220,38,38,0.15)" : "none",
    transition: "all 0.2s ease",
    position: "relative",
    overflow: "hidden",
  });

  const labelStyle = {
    color: "rgba(255,255,255,0.45)",
    fontSize: "12px",
    fontFamily: "'Exo 2', sans-serif",
    marginBottom: "6px",
    display: "block",
  };

  const checkboxRow = (checked, onChange, label, extra) => (
    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}>
      <div onClick={onChange} style={{
        width: "18px", height: "18px", border: `2px solid ${checked ? "#22c55e" : "rgba(255,255,255,0.25)"}`,
        borderRadius: "4px", background: checked ? "rgba(34,197,94,0.2)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", flexShrink: 0, cursor: "pointer",
      }}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>}
      </div>
      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontFamily: "'Exo 2', sans-serif" }}>
        {label}{extra && <span onClick={extra.action} style={{ color: "#4ade80", cursor: "pointer", textDecoration: "underline", marginLeft: "4px" }}>{extra.text}</span>}
      </span>
    </label>
  );

  const EyeIcon = ({ visible }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {visible
        ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
        : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>}
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800&family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      <div style={bg} />
      <ParticleCanvas />

      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", padding: "16px 32px",
        borderBottom: "1px solid rgba(74,222,128,0.1)",
        background: "rgba(8,16,8,0.6)", backdropFilter: "blur(16px)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", background: "#e11d48",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(225,29,72,0.5)",
          }}>
            <span style={{ color: "#fff", fontFamily: "'Orbitron', monospace", fontWeight: "700", fontSize: "12px" }}>МТС</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Exo 2', sans-serif", fontSize: "15px", fontWeight: "500" }}>
            MTS Cloud Services
          </span>
        </div>
        {page === "dashboard" && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Exo 2', sans-serif", fontSize: "13px" }}>
              {user?.name}
            </span>
            <button onClick={() => { setPage("register"); setUser(null); }} style={{
              background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)",
              color: "#fca5a5", borderRadius: "8px", padding: "6px 14px",
              cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontSize: "13px",
            }}>Выйти</button>
          </div>
        )}
      </header>

      {/* Main */}
      <main style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "32px 16px", position: "relative", zIndex: 1,
      }}>

        {/* REGISTER PAGE */}
        {page === "register" && (
          <div style={{ display: "flex", alignItems: "center", gap: "60px", maxWidth: "960px", width: "100%" }}>
            <div style={{ flex: 1, ...cardStyle }}>
              <h1 style={{
                color: "#f1f5f9", fontFamily: "'Exo 2', sans-serif",
                fontSize: "28px", fontWeight: "700", marginBottom: "6px", marginTop: 0,
              }}>Регистрация в EcoCloud</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Exo 2', sans-serif", fontSize: "13px", marginBottom: "28px", marginTop: 0 }}>
                Начните свой путь к экологически эффективному облаку
              </p>

              <InputField placeholder="Имя и Фамилия" value={regForm.name} onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))} />
              <InputField placeholder="Электронная почта" type="email" value={regForm.email} onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))} />
              <InputField
                placeholder="Пароль"
                type={showPassword ? "text" : "password"}
                value={regForm.password}
                onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))}
                rightIcon={<span onClick={() => setShowPassword(v => !v)}><EyeIcon visible={showPassword} /></span>}
              />
              <InputField
                placeholder="Подтвердите пароль"
                type={showConfirm ? "text" : "password"}
                value={regForm.confirm}
                onChange={e => setRegForm(p => ({ ...p, confirm: e.target.value }))}
                rightIcon={<span onClick={() => setShowConfirm(v => !v)}><EyeIcon visible={showConfirm} /></span>}
              />
              <InputField placeholder="Название организации (необязательно)" value={regForm.org} onChange={e => setRegForm(p => ({ ...p, org: e.target.value }))} />

              <div style={{ display: "flex", gap: "24px", marginBottom: "20px", flexWrap: "wrap" }}>
                {checkboxRow(agreedTerms, () => setAgreedTerms(v => !v), "Согласен с", {
                  text: "условиями",
                  action: () => setModal("terms"),
                })}
                {checkboxRow(agreedMailing, () => setAgreedMailing(v => !v), "Согласен на рассылку")}
              </div>

              <button
                style={btnStyle(!loading)}
                onClick={handleRegister}
                onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 28px rgba(220,38,38,0.5)"; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(220,38,38,0.4)"; }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: "spin 0.8s linear infinite" }}>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                    Регистрация...
                  </span>
                ) : "Регистрация"}
              </button>

              <p style={{ textAlign: "center", marginTop: "18px", fontFamily: "'Exo 2', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                Уже есть аккаунт?{" "}
                <span onClick={() => setPage("login")} style={{ color: "#4ade80", cursor: "pointer", textDecoration: "underline" }}>Войти</span>
              </p>
            </div>

            <div style={{ flex: "0 0 280px", height: "480px", opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
              <GlowTree />
            </div>
          </div>
        )}

        {/* LOGIN PAGE */}
        {page === "login" && (
          <div style={{ display: "flex", alignItems: "center", gap: "60px", maxWidth: "960px", width: "100%" }}>
            <div style={{ flex: 1, ...cardStyle }}>
              <h1 style={{ color: "#f1f5f9", fontFamily: "'Exo 2', sans-serif", fontSize: "28px", fontWeight: "700", marginBottom: "6px", marginTop: 0 }}>
                Вход в EcoCloud
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Exo 2', sans-serif", fontSize: "13px", marginBottom: "28px", marginTop: 0 }}>
                Продолжите работу с экологичным облаком
              </p>

              <InputField placeholder="Электронная почта" type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} />
              <InputField
                placeholder="Пароль"
                type={showPassword ? "text" : "password"}
                value={loginForm.password}
                onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                rightIcon={<span onClick={() => setShowPassword(v => !v)}><EyeIcon visible={showPassword} /></span>}
              />

              <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <span onClick={() => showToast("Ссылка для сброса пароля отправлена на email")} style={{
                  color: "#4ade80", cursor: "pointer", fontSize: "12px",
                  fontFamily: "'Exo 2', sans-serif", textDecoration: "underline",
                }}>Забыли пароль?</span>
              </div>

              <button
                style={btnStyle(!loading)}
                onClick={handleLogin}
                onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}
              >
                {loading ? "Вход..." : "Войти"}
              </button>

              <p style={{ textAlign: "center", marginTop: "18px", fontFamily: "'Exo 2', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                Нет аккаунта?{" "}
                <span onClick={() => setPage("register")} style={{ color: "#4ade80", cursor: "pointer", textDecoration: "underline" }}>Зарегистрироваться</span>
              </p>
            </div>
            <div style={{ flex: "0 0 280px", height: "480px" }}><GlowTree /></div>
          </div>
        )}

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div style={{ maxWidth: "1000px", width: "100%", opacity: mounted ? 1 : 0, transition: "opacity 0.6s" }}>
            <div style={{ ...cardStyle, marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #15803d, #4ade80)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 24px rgba(74,222,128,0.35)", fontSize: "22px",
                }}>🌿</div>
                <div>
                  <h2 style={{ color: "#f1f5f9", fontFamily: "'Orbitron', monospace", fontSize: "20px", margin: 0 }}>
                    Добро пожаловать, {user?.name?.split(" ")[0]}!
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Exo 2', sans-serif", fontSize: "13px", margin: "4px 0 0" }}>
                    {user?.email} {user?.org && `· ${user.org}`}
                  </p>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div style={{ color: "#4ade80", fontFamily: "'Orbitron', monospace", fontSize: "11px", letterSpacing: "1px" }}>ECO SCORE</div>
                  <div style={{ color: "#86efac", fontFamily: "'Orbitron', monospace", fontSize: "28px", fontWeight: "700" }}>92.4</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "16px" }}>
              {[
                { icon: "☁️", label: "Хранилище", value: "2.4 ТБ", sub: "из 10 ТБ", color: "#60a5fa" },
                { icon: "⚡", label: "Вычисления", value: "8 vCPU", sub: "активно", color: "#a78bfa" },
                { icon: "🌱", label: "CO₂ сэкономлено", value: "142 кг", sub: "в этом месяце", color: "#4ade80" },
              ].map((card, i) => (
                <div key={i} style={{
                  ...cardStyle, padding: "24px", cursor: "pointer",
                  transition: "all 0.25s ease", opacity: mounted ? 1 : 0,
                  transitionDelay: `${0.1 + i * 0.1}s`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = card.color + "60"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(74,222,128,0.18)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Exo 2', sans-serif", fontSize: "12px", marginBottom: "4px" }}>{card.label}</div>
                  <div style={{ color: card.color, fontFamily: "'Orbitron', monospace", fontSize: "22px", fontWeight: "700" }}>{card.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Exo 2', sans-serif", fontSize: "12px", marginTop: "4px" }}>{card.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
              <div style={{ ...cardStyle, padding: "28px" }}>
                <h3 style={{ color: "#4ade80", fontFamily: "'Exo 2', sans-serif", fontSize: "15px", fontWeight: "600", marginTop: 0, marginBottom: "16px" }}>
                  Быстрые действия
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Создать сервер", icon: "🖥️" },
                    { label: "Загрузить файлы", icon: "📤" },
                    { label: "Мониторинг", icon: "📊" },
                    { label: "Настройки", icon: "⚙️" },
                  ].map((btn, i) => (
                    <button key={i} onClick={() => showToast(`${btn.label} — функция в разработке`)} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.15)",
                      borderRadius: "10px", padding: "14px", color: "rgba(255,255,255,0.7)",
                      cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontSize: "13px",
                      display: "flex", alignItems: "center", gap: "8px",
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.08)"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.3)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(74,222,128,0.15)"; }}>
                      <span>{btn.icon}</span> {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ ...cardStyle, padding: "28px" }}>
                <h3 style={{ color: "#4ade80", fontFamily: "'Exo 2', sans-serif", fontSize: "15px", fontWeight: "600", marginTop: 0, marginBottom: "16px" }}>
                  Эко-статус
                </h3>
                {[
                  { label: "Зел. энергия", pct: 87 },
                  { label: "Утилизация", pct: 71 },
                  { label: "PUE", pct: 94 },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Exo 2', sans-serif", fontSize: "12px" }}>{item.label}</span>
                      <span style={{ color: "#4ade80", fontFamily: "'Orbitron', monospace", fontSize: "11px" }}>{item.pct}%</span>
                    </div>
                    <div style={{ height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}>
                      <div style={{
                        width: `${item.pct}%`, height: "100%",
                        background: `linear-gradient(90deg, #15803d, #4ade80)`,
                        borderRadius: "3px", boxShadow: "0 0 8px rgba(74,222,128,0.4)",
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Terms modal */}
      {modal === "terms" && (
        <Modal title="Условия использования EcoCloud" onClose={() => setModal(null)}>
          <p>Используя сервис MTS EcoCloud, вы соглашаетесь с нашей политикой обработки данных и условиями оказания услуг.</p>
          <p>Мы обязуемся защищать ваши персональные данные в соответствии с законодательством РФ и не передавать их третьим лицам без вашего согласия.</p>
          <p>EcoCloud работает на 100% возобновляемой энергии и сертифицирован по стандартам ISO 14001 и ISO 27001.</p>
          <p style={{ marginBottom: 0 }}>Минимальный возраст пользователя — 18 лет. Использование сервиса в коммерческих целях регулируется отдельным договором.</p>
        </Modal>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.28); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px rgba(8,16,8,0.9) inset !important; -webkit-text-fill-color: #e2e8f0 !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
        ::-webkit-scrollbar-thumb { background: rgba(74,222,128,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}