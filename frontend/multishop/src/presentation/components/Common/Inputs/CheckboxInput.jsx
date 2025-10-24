import React from "react";

const CheckboxInput = ({
      id,
      name,
      label,
      checked,
      onChange,
      className = "checkbox-label"
}) => {
      return (
            <div className="input-group checkbox-group">
                  <label className={className}>
                        <input
                              type="checkbox"
                              id={id}
                              name={name}
                              checked={checked}
                              onChange={onChange}
                        />
                        {label}
                  </label>
            </div>
      );
};

export default CheckboxInput;
