import React from "react";

const EmailInput = ({
      id,
      name,
      label,
      value,
      onChange,
      placeholder = "Ejemplo: usuario@email.com",
      required = false,
      className = "modal-input",
      disabled = false
}) => {
      return (
            <div className="input-group">
                  <label htmlFor={id} className="input-label">
                        {label} {required && "*"}
                  </label>
                  <input
                        type="email"
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={className}
                        placeholder={placeholder}
                        disabled={disabled}
                  />
            </div>
      );
};

export default EmailInput;
