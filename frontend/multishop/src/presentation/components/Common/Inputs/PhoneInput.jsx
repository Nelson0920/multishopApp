import React from "react";

const PhoneInput = ({
      id,
      name,
      label,
      value,
      onChange,
      placeholder = "Ejemplo: 0412-1234567",
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
                        type="tel"
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

export default PhoneInput;
