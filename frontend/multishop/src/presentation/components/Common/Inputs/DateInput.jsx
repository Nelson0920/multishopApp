import React from "react";

const DateInput = ({
      id,
      name,
      label,
      value,
      onChange,
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
                        type="date"
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={className}
                        disabled={disabled}
                  />
            </div>
      );
};

export default DateInput;
