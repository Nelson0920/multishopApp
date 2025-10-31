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
      disabled = false,
      hasError = false,
      errorMessage = ""
}) => {
      const inputClassName = `${className}${hasError ? ' error' : ''}`;

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
                        className={inputClassName}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        disabled={disabled}
                  />
                  {hasError && errorMessage && (
                        <div className="error-message">
                              {errorMessage}
                        </div>
                  )}
            </div>
      );
};

export default TextInput;
