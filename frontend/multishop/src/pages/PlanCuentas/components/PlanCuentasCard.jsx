import React from "react";
import { MdEdit } from "react-icons/md";

const PlanCuentasCard = ({ plan, onEdit, getCategoryColor }) => {
      return (
            <div className="plan-card">
                  <div className="card-header">
                        <div className="card-title">
                              <span className="codigo-badge">{plan.codigo}</span>
                              <h3 className="plan-name">{plan.nombre}</h3>
                        </div>
                        <button
                              className="btn-action btn-edit"
                              onClick={() => onEdit(plan)}
                              title="Editar"
                        >
                              <MdEdit size={18} />
                        </button>
                  </div>

                  <div className="card-content">
                        <div className="card-row">
                              <span className="label">Categoría:</span>
                              <span
                                    className="categoria-badge"
                                    style={{ backgroundColor: getCategoryColor(plan.categoria) }}
                              >
                                    {plan.categoria.charAt(0).toUpperCase() + plan.categoria.slice(1)}
                              </span>
                        </div>

                        <div className="card-row">
                              <span className="label">Auxiliar 1:</span>
                              <span className="value">{plan.auxiliarContable1 || "-"}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Auxiliar 2:</span>
                              <span className="value">{plan.auxiliarContable2 || "-"}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Fecha Creación:</span>
                              <span className="value">{plan.fechaCreacion}</span>
                        </div>
                  </div>
            </div>
      );
};

export default PlanCuentasCard;
