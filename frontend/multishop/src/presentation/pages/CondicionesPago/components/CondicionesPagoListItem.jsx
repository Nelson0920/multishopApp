import React from "react";
import { MdEdit } from "react-icons/md";

const CondicionesPagoListItem = ({ condicion, onEdit }) => {
      return (
            <tr>
                  <td>{condicion.days} días</td>
                  <td>{condicion.discount_percentage}%</td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(condicion)}
                                    title="Editar condición de pago"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default CondicionesPagoListItem;
