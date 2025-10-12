import React from "react";
import { MdEdit } from "react-icons/md";

const AsignacionISRLListItem = ({ asignacion, onEdit }) => {
      return (
            <tr>
                  <td>{asignacion.code}</td>
                  <td>{asignacion.name}</td>
                  <td>{asignacion.percentage_pn}%</td>
                  <td>{asignacion.percentage_pj}%</td>
                  <td>${asignacion.subtrahend_amount_pn?.toLocaleString()}</td>
                  <td>${asignacion.subtrahend_amount_pj?.toLocaleString() || 'N/A'}</td>
                  <td className="actions-cell">
                        <div className="action-buttons">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(asignacion)}
                                    title="Editar concepto de retención ISRL"
                              >
                                    <MdEdit size={16} />
                              </button>
                        </div>
                  </td>
            </tr>
      );
};

export default AsignacionISRLListItem;
