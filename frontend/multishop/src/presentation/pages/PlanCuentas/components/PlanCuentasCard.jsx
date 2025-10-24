import React from "react";
import { MdEdit } from "react-icons/md";

const PlanCuentasCard = ({ cuenta, onEdit }) => {
      return (
            <div className="cuenta-card">
                  <div className="card-header">
                        <div className="cuenta-code">{cuenta.codigo}</div>
                        <button
                              className="btn-edit"
                              onClick={() => onEdit(cuenta)}
                              title="Editar cuenta"
                        >
                              <MdEdit size={16} />
                        </button>
                  </div>
                  <div className="card-content">
                        <h3 className="cuenta-name">{cuenta.nombre}</h3>
                        <div className="cuenta-auxiliares">
                              {cuenta.auxiliar1 && (
                                    <div className="auxiliar-info">
                                          <span className="auxiliar-label">Auxiliar 1:</span>
                                          <span className="auxiliar-value">{cuenta.auxiliar1}</span>
                                    </div>
                              )}
                              {cuenta.auxiliar2 && (
                                    <div className="auxiliar-info">
                                          <span className="auxiliar-label">Auxiliar 2:</span>
                                          <span className="auxiliar-value">{cuenta.auxiliar2}</span>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default PlanCuentasCard;