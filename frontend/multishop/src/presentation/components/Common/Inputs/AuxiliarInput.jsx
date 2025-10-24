import React from "react";
import { MdSearch, MdAccountTree } from "react-icons/md";

const AuxiliarInput = ({
      id,
      name,
      value,
      onClick,
      placeholder = "Seleccionar auxiliar",
      required = false,
      disabled = false,
      className = "modal-input",
      auxiliarNumber = 1
}) => {
      return (
            <div className="input-group auxiliar-group">
                  <label htmlFor={id} className="input-label">
                        <MdAccountTree size={16} className="auxiliar-icon" />
                        Auxiliar {auxiliarNumber} {required && "*"}
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
                              title={`Buscar auxiliar ${auxiliarNumber}`}
                        >
                              <MdSearch size={16} />
                        </button>
                  </div>
            </div>
      );
};

export default AuxiliarInput;
