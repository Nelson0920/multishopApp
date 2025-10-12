import React from "react";
import { MdEdit } from "react-icons/md";

const CategoriasListItem = ({ categoria, onEdit, planCuentas, auxiliares }) => {
      return (
            <tr>
                  <td>{categoria.name}</td>
                  <td>${categoria.credit_limit?.toLocaleString()}</td>
                  <td>{categoria.credit_terms}</td>
                  <td>{categoria.discount_percentage}%</td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(categoria)}
                                    title="Editar categoría"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default CategoriasListItem;
