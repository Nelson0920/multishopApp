import React from "react";
import { MdEdit } from "react-icons/md";

const CategoriasCard = ({ categoria, onEdit, planCuentas, auxiliares }) => {
      return (
            <div className="categoria-card">
                  <div className="card-header">
                        <div className="categoria-name">{categoria.name}</div>
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
                              <span className="label">Límite Crédito:</span>
                              <span className="value">${categoria.credit_limit?.toLocaleString()}</span>
                        </div>
                        <div className="card-row">
                              <span className="label">Términos:</span>
                              <span className="value">{categoria.credit_terms}</span>
                        </div>
                        <div className="card-row">
                              <span className="label">Descuento:</span>
                              <span className="value">{categoria.discount_percentage}%</span>
                        </div>
                        <div className="card-row">
                              <span className="label">Plan de Cuentas:</span>
                              <span className="value">
                                    {planCuentas.find(pc => pc.id === categoria.plan_cuentas_id)?.codigo || 'N/A'}
                              </span>
                        </div>
                        <div className="card-row">
                              <span className="label">Auxiliar 1:</span>
                              <span className="value">
                                    {auxiliares.find(aux => aux.auxiliar === categoria.auxiliary1_id)?.nombre || 'N/A'}
                              </span>
                        </div>
                        <div className="card-row">
                              <span className="label">Vigencia:</span>
                              <span className="value">{categoria.deadline_day} días</span>
                        </div>
                  </div>
            </div>
      );
};

export default CategoriasCard;
