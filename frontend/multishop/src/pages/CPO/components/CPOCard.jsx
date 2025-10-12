import React from "react";
import { MdEdit, MdDelete, MdBusiness } from "react-icons/md";
import "../CPO.scss";

const CPOCard = ({
      cpo,
      onEdit,
      onDelete,
      planCuentas,
      auxiliares,
      categoriasCPO,
      condicionesPago,
      asignacionesISRL,
      usuarios
}) => {
      const getCuentaContable = (id) => {
            const cuenta = planCuentas.find(c => c.id === id);
            return cuenta ? `${cuenta.codigo} - ${cuenta.nombre}` : "N/A";
      };

      const getAuxiliar = (auxiliarId) => {
            const auxiliar = auxiliares.find(a => a.auxiliar === auxiliarId);
            return auxiliar ? `${auxiliar.auxiliar} - ${auxiliar.nombre}` : "N/A";
      };

      const getCategoria = (id) => {
            const categoria = categoriasCPO.find(c => c.id === id);
            return categoria ? categoria.name : "N/A";
      };

      const getCondicionesPago = (id) => {
            const condicion = condicionesPago.find(c => c.id === id);
            return condicion ? `${condicion.days} días - ${condicion.discount_percentage}%` : "N/A";
      };

      const getConceptoISRL = (id) => {
            const concepto = asignacionesISRL.find(a => a.id === id);
            return concepto ? `${concepto.code} - ${concepto.name}` : "N/A";
      };

      const getVendedor = (id) => {
            const vendedor = usuarios.find(u => u.id === id);
            return vendedor ? vendedor.name : "N/A";
      };

      const getTipoTexto = (tipo) => {
            switch (tipo) {
                  case "cliente": return "Cliente";
                  case "proveedor": return "Proveedor";
                  case "otros": return "Otros";
                  default: return tipo;
            }
      };

      const getTipoContribuyenteTexto = (tipo) => {
            switch (tipo) {
                  case "contribuyente ordinario": return "Ordinario";
                  case "contribuyente especial": return "Especial";
                  default: return tipo;
            }
      };

      return (
            <div className="cpo-card">
                  <div className="card-header">
                        <div className="card-title">
                              <div className="cpo-name">{cpo.name}</div>
                              <span className={`cpo-type-badge ${cpo.type}`}>{getTipoTexto(cpo.type)}</span>
                        </div>
                        <div className="card-actions">
                              <button
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(cpo)}
                                    title="Editar CPO"
                              >
                                    <MdEdit size={16} />
                              </button>
                              <button
                                    className="btn-action btn-delete"
                                    onClick={() => onDelete(cpo.id)}
                                    title="Eliminar CPO"
                              >
                                    <MdDelete size={16} />
                              </button>
                        </div>
                  </div>

                  <div className="card-content">
                        <div className="card-row">
                              <span className="label">RIF/Cédula:</span>
                              <span className="value">{cpo.rif}</span>
                        </div>

                        {cpo.phone && (
                              <div className="card-row">
                                    <span className="label">Teléfono:</span>
                                    <span className="value">{cpo.phone}</span>
                              </div>
                        )}

                        {cpo.email && (
                              <div className="card-row">
                                    <span className="label">Email:</span>
                                    <span className="value">{cpo.email}</span>
                              </div>
                        )}

                        <div className="card-row">
                              <span className="label">Categoría:</span>
                              <span className="value">{getCategoria(cpo.id_categories_clients)}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Vendedor:</span>
                              <span className="value">{getVendedor(cpo.id_sellers)}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Cuenta Contable:</span>
                              <span className="value">{getCuentaContable(cpo.id_accounting_accounts)}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Auxiliar 1:</span>
                              <span className="value">{getAuxiliar(cpo.auxiliary1)}</span>
                        </div>

                        {cpo.auxiliary2 && (
                              <div className="card-row">
                                    <span className="label">Auxiliar 2:</span>
                                    <span className="value">{getAuxiliar(cpo.auxiliary2)}</span>
                              </div>
                        )}

                        <div className="card-row">
                              <span className="label">Condiciones de Pago:</span>
                              <span className="value">{getCondicionesPago(cpo.id_PaymentConditions)}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Tipo Contribuyente:</span>
                              <span className="value">{getTipoContribuyenteTexto(cpo.type_taxpayer)}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Retención IVA:</span>
                              <span className="value">{cpo.retention_percentage_iva}%</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Concepto ISRL:</span>
                              <span className="value">{getConceptoISRL(cpo.id_RetentionISLRConcepts)}</span>
                        </div>

                        <div className="card-row">
                              <span className="label">Estado:</span>
                              <span className={`value ${cpo.blockade ? 'blocked' : 'active'}`}>
                                    {cpo.blockade ? "Bloqueado" : "Activo"}
                              </span>
                        </div>

                        {cpo.observations && (
                              <div className="card-row">
                                    <span className="label">Observaciones:</span>
                                    <span className="value">{cpo.observations}</span>
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default CPOCard;
