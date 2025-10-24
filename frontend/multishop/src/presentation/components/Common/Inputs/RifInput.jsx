import React from "react";

const RifInput = ({
      id,
      name,
      label,
      value,
      onChange,
      placeholder = "Ejemplo: V-12345678 o J-87654321",
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
                        type="text"
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

export default RifInput;
