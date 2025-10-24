import React from "react";

const NumberInput = ({
      id,
      name,
      label,
      value,
      onChange,
      placeholder,
      required = false,
      min,
      max,
      step,
      className = "modal-input",
      disabled = false
}) => {
      return (
            <div className="input-group">
                  <label htmlFor={id} className="input-label">
                        {label} {required && "*"}
                  </label>
                  <input
                        type="number"
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={className}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                  />
            </div>
      );
};

export default NumberInput;
