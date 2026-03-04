

const FormField = ({ label, type, id, placeholder, optional, value, onChange }) => {
  return (
    <div className="auth-form__field">
      <label className="auth-form__label" htmlFor={id}>
        {label}
        {optional && <span className="auth-form__optional"> (необязательно)</span>}
      </label>
      <input
        className="auth-form__input"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;