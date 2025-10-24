import React from "react";

const TextInput = ({
      id,
      name,
      label,
      value,
      onChange,
      placeholder,
      required = false,
      maxLength,
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
                        maxLength={maxLength}
                        disabled={disabled}
                  />
            </div>
      );
};

export default TextInput;
