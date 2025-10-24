import React from "react";
import { MdEdit } from "react-icons/md";

const AuxiliaresCard = ({ auxiliar, onEdit }) => {
      return (
            <div className="auxiliar-card">
                  <div className="card-header">
                        <div className="auxiliar-code">{auxiliar.auxiliary_code}</div>
                        <button
                              className="btn-edit"
                              onClick={() => onEdit(auxiliar)}
                              title="Editar auxiliar"
                        >
                              <MdEdit size={16} />
                        </button>
                  </div>
                  <div className="card-content">
                        <h3 className="auxiliar-name">{auxiliar.name}</h3>
                  </div>
            </div>
      );
};

export default AuxiliaresCard;