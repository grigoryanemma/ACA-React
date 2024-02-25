import "../../../styles/formField.css";

export const FormField = ({ children, error, label, ...rest }) => {
  return (
    <div className="field">
      <div className="form-fields">
        {label && <div className="data-label">{label}</div>}
        <div className="field-content">{children}</div>
      </div>
        {error?.message && <div className="error-message">{error.message}</div>}
    </div>
  );
};
