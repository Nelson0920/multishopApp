import React from "react";
import { MdEdit } from "react-icons/md";

const AsignacionISRLCard = ({ asignacion, onEdit }) => {
      return (
            <div className="asignacion-card">
                  <div className="card-header">
                        <div className="asignacion-code">{asignacion.code}</div>
                        <button
                              className="btn-edit"
                              onClick={() => onEdit(asignacion)}
                              title="Editar concepto de retención ISRL"
                        >
                              <MdEdit size={16} />
                        </button>
                  </div>
                  <div className="card-content">
                        <h3 className="asignacion-name">{asignacion.name}</h3>
                        <div className="card-row">
                              <span className="label">% PN:</span>
                              <span className="value">{asignacion.percentage_pn}%</span>
                        </div>
                        <div className="card-row">
                              <span className="label">% PJ:</span>
                              <span className="value">{asignacion.percentage_pj}%</span>
                        </div>
                        <div className="card-row">
                              <span className="label">Sustraendo PN:</span>
                              <span className="value">${asignacion.subtrahend_amount_pn?.toLocaleString()}</span>
                        </div>
                        <div className="card-row">
                              <span className="label">Sustraendo PJ:</span>
                              <span className="value">${asignacion.subtrahend_amount_pj?.toLocaleString() || 'N/A'}</span>
                        </div>
                  </div>
            </div>
      );
};

export default AsignacionISRLCard;
