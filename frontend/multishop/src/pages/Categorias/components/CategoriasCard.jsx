import React from "react";
import { MdEdit } from "react-icons/md";

const CategoriasCard = ({ categoria, onEdit }) => {
      return (
            <div className="categoria-card">
                  <div className="card-header">
                        <div className="categoria-name">{categoria.nombre}</div>
                        <button
                              className="btn-edit"
                              onClick={() => onEdit(categoria)}
                              title="Editar categoría"
                        >
                              <MdEdit size={16} />
                        </button>
                  </div>
                  <div className="card-content">
                        <div className="card-row">
                              <span className="label">Margen:</span>
                              <span className="value">{categoria.margenGanancia}</span>
                        </div>
                        <div className="card-row">
                              <span className="label">Comisión:</span>
                              <span className="value">{categoria.porcentajeComision}</span>
                        </div>
                  </div>
            </div>
      );
};

export default CategoriasCard;
