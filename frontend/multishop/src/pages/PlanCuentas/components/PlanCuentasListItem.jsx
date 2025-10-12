import React from "react";
import { MdEdit } from "react-icons/md";

const PlanCuentasListItem = ({ plan, onEdit, getCategoryColor }) => {
      return (
            <tr key={plan.id}>
                  <td className="codigo-cell">
                        <span className="codigo-badge">{plan.codigo}</span>
                  </td>
                  <td className="nombre-cell">{plan.nombre}</td>
                  <td className="categoria-cell">
                        <span
                              className="categoria-badge"
                              style={{ backgroundColor: getCategoryColor(plan.categoria) }}
                        >
                              {plan.categoria.charAt(0).toUpperCase() + plan.categoria.slice(1)}
                        </span>
                  </td>
                  <td className="auxiliar-cell">{plan.auxiliarContable1 || "-"}</td>
                  <td className="auxiliar-cell">{plan.auxiliarContable2 || "-"}</td>
                  <td className="fecha-cell">{plan.fechaCreacion}</td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(plan)}
                                    title="Editar"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default PlanCuentasListItem;
