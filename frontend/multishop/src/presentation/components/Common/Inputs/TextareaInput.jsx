import React from "react";

const TextareaInput = ({
      id,
      name,
      label,
      value,
      onChange,
      placeholder,
      required = false,
      rows = 3,
      className = "modal-input modal-textarea",
      disabled = false
}) => {
      return (
            <div className="input-group">
                  <label htmlFor={id} className="input-label">
                        {label} {required && "*"}
                  </label>
                  <textarea
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={className}
                        placeholder={placeholder}
                        rows={rows}
                        disabled={disabled}
                  />
            </div>
      );
};

export default TextareaInput;
