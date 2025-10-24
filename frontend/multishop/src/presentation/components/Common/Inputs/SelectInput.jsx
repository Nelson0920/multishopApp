import React from "react";

const SelectInput = ({
      id,
      name,
      label = null,
      value,
      onChange,
      options = [],
      required = false,
      placeholder = "Seleccione una opción",
      className = "modal-input",
      disabled = false
}) => {
      return (
            <div className="input-group">
                  {label && <label htmlFor={id} className="input-label">
                        {label} {required && "*"}
                  </label>}
                  <select
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={className}
                        disabled={disabled}
                  >
                        <option value="">{placeholder}</option>
                        {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                    {option.label}
                              </option>
                        ))}
                  </select>
            </div>
      );
};

export default SelectInput;
