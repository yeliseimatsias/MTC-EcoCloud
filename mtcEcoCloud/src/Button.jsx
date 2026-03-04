

const Button = ({ children, variant = 'eco', onClick, type = 'button' }) => {
  const buttonClass = `auth-button auth-button--${variant}`;
  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;