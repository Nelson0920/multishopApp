import React from "react";
import { MdSearch } from "react-icons/md";

const SearchInput = ({
      id,
      name,
      label,
      value,
      onClick,
      placeholder = "Seleccionar...",
      required = false,
      disabled = false,
      className = "modal-input"
}) => {
      return (
            <div className="input-group">
                  <label htmlFor={id} className="input-label">
                        {label} {required && "*"}
                  </label>
                  <div className="search_input_wrapper">
                        <input
                              type="text"
                              id={id}
                              name={name}
                              value={value}
                              readOnly
                              className={className}
                              placeholder={placeholder}
                              onClick={onClick}
                              disabled={disabled}
                        />
                        <button
                              type="button"
                              className="search_button"
                              onClick={onClick}
                              disabled={disabled}
                              title={`Buscar ${label.toLowerCase()}`}
                        >
                              <MdSearch size={16} />
                        </button>
                  </div>
            </div>
      );
};

export default SearchInput;
