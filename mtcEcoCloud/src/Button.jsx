import './css/Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '',
  isActive = false // Новый пропс для активного состояния
}) => {
  const buttonClass = [
    'btn',
    `btn--${variant}`,
    isActive ? 'btn--active' : '', // Добавляем активный класс
    className
  ].join(' ').trim();

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;