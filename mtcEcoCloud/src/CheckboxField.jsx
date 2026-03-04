

const CheckboxField = ({ id, label, checked, onChange }) => {
  return (
    <div className="auth-form__checkbox">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label className="auth-form__checkbox-label" htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckboxField;