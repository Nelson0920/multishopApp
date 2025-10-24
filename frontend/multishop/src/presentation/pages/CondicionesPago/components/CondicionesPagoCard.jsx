import React from "react";
import { MdEdit } from "react-icons/md";

const CondicionesPagoCard = ({ condicion, onEdit }) => {
      return (
            <div className="condicion-card">
                  <div className="card-header">
                        <div className="condicion-name">{condicion.days} días - {condicion.discount_percentage}%</div>
                        <button
                              className="btn-edit"
                              onClick={() => onEdit(condicion)}
                              title="Editar condición de pago"
                        >
                              <MdEdit size={16} />
                        </button>
                  </div>
                  <div className="card-content">
                        <div className="card-row">
                              <span className="label">Días:</span>
                              <span className="value">{condicion.days} días</span>
                        </div>
                        <div className="card-row">
                              <span className="label">Descuento:</span>
                              <span className="value">{condicion.discount_percentage}%</span>
                        </div>
                  </div>
            </div>
      );
};

export default CondicionesPagoCard;
