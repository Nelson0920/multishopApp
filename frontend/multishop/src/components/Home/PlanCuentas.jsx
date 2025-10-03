import React, { useState } from "react";
import "../../styles/PlanCuentas.scss";
import { MdAccountBalance, MdSearch } from "react-icons/md";

const PlanCuentas = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [codigo, setCodigo] = useState("");
      const [nombre, setNombre] = useState("");
      const [auxiliarContable1, setAuxiliarContable1] = useState("");
      const [auxiliarContable2, setAuxiliarContable2] = useState("");
      const [categoria, setCategoria] = useState("");
      const [visibleCodes, setVisibleCodes] = useState(false);
      const [filterText, setFilterText] = useState("");

      const categorias = ["otros", "activos", "pasivos", "gasto"];

      const cuentasContables = [
            { codigo: "1.01.1.01", descripcion: "Caja General" },
            { codigo: "1.01.1.02", descripcion: "Caja Chica" },
            { codigo: "1.01.1.03", descripcion: "Bancos Nacionales" },
            { codigo: "1.01.1.04", descripcion: "Bancos Internacionales" },
            { codigo: "1.02.1.01", descripcion: "Cuentas por Cobrar Comerciales" },
            { codigo: "1.02.1.02", descripcion: "Cuentas por Cobrar a Empleados" },
            { codigo: "1.02.1.03", descripcion: "Anticipo a Proveedores" },
            { codigo: "1.03.1.01", descripcion: "Inventario Materia Prima" },
            { codigo: "1.03.1.02", descripcion: "Inventario Productos Terminados" },
            { codigo: "1.03.1.03", descripcion: "Inventario en Tránsito" },
            { codigo: "1.04.1.01", descripcion: "Propiedad Planta y Equipo - Terrenos" },
            { codigo: "1.04.1.02", descripcion: "Propiedad Planta y Equipo - Edificios" },
            { codigo: "1.04.1.03", descripcion: "Propiedad Planta y Equipo - Maquinaria" },
            { codigo: "2.01.1.01", descripcion: "Cuentas por Pagar Comerciales" },
            { codigo: "2.01.1.02", descripcion: "Cuentas por Pagar Bancarias" },
            { codigo: "2.01.1.03", descripcion: "Cuentas por Pagar a Proveedores" },
            { codigo: "2.02.1.01", descripcion: "Préstamos Bancarios Corto Plazo" },
            { codigo: "2.02.1.02", descripcion: "Préstamos Bancarios Largo Plazo" },
            { codigo: "3.01.1.01", descripcion: "Capital Social" },
            { codigo: "3.01.1.02", descripcion: "Reservas Legales" },
            { codigo: "4.01.1.01", descripcion: "Ventas Nacionales" },
            { codigo: "4.01.1.02", descripcion: "Ventas Internacionales" },
            { codigo: "4.02.1.01", descripcion: "Dev Reb Bajas en Ventas Nacionales" },
            { codigo: "4.02.1.02", descripcion: "Dev Reb Bajas en Ventas Internacionales" },
            { codigo: "5.01.1.01", descripcion: "Compras Nacionales" },
            { codigo: "5.01.1.02", descripcion: "Compras Internacionales" },
            { codigo: "5.02.1.01", descripcion: "Gastos Administrativos" },
            { codigo: "5.02.1.02", descripcion: "Gastos de Ventas" },
            { codigo: "5.02.1.03", descripcion: "Gastos Financieros" },
            { codigo: "5.03.1.01", descripcion: "Seguridad Social - Empleados" },
            { codigo: "5.03.1.02", descripcion: "Seguridad Social - Empresa" }
      ];

      const handleAceptar = () => {
            setIsModalOpen(false);
            setCodigo("");
            setNombre("");
            setAuxiliarContable1("");
            setAuxiliarContable2("");
            setCategoria("");
            setVisibleCodes(false);
      };

      const handleCancelar = () => {
            setIsModalOpen(false);
            setCodigo("");
            setNombre("");
            setAuxiliarContable1("");
            setAuxiliarContable2("");
            setCategoria("");
            setVisibleCodes(false);
      };

      const handleOpenModal = () => {
            setIsModalOpen(true);
      };

      const handleCodigoChange = (e) => {
            const value = e.target.value;

            // Solo permitir dígitos
            let digits = value.replace(/[^0-9]/g, '');

            // Limitar a 6 dígitos máximo (para formato X.XX.X.XX)
            if (digits.length > 6) {
                  digits = digits.slice(0, 6);
            }

            // Aplicar formato X.XX.X.XX automáticamente
            let formattedValue = '';

            if (digits.length > 0) {
                  formattedValue = digits.charAt(0);

                  if (digits.length > 1) {
                        formattedValue += '.' + digits.slice(1, 3);

                        if (digits.length > 3) {
                              formattedValue += '.' + digits.charAt(3);

                              if (digits.length > 4) {
                                    formattedValue += '.' + digits.slice(4, 6);
                              }
                        }
                  }
            }

            setCodigo(formattedValue);
      };

      const handleNombreChange = (e) => {
            const value = e.target.value.toUpperCase();
            const filteredValue = value.replace(/[^A-Z\s\-_]/g, '');
            setNombre(filteredValue);
      };

      const handleAuxiliarChange = (setter) => (e) => {
            const value = e.target.value.toUpperCase();
            const filteredValue = value.replace(/[^A-Z]/g, '');
            setter(filteredValue);
      };

      const handleBuscarCodigo = () => {
            setVisibleCodes(true);
      };

      const handleFilterChange = (e) => {
            const value = e.target.value;

            let digits = value.replace(/[^0-9]/g, '');

            if (digits.length > 6) {
                  digits = digits.slice(0, 6);
            }

            let formattedValue = '';

            if (digits.length > 0) {
                  formattedValue = digits.charAt(0);

                  if (digits.length > 1) {
                        formattedValue += '.' + digits.slice(1, 3);

                        if (digits.length > 3) {
                              formattedValue += '.' + digits.charAt(3);

                              if (digits.length > 4) {
                                    formattedValue += '.' + digits.slice(4, 6);
                              }
                        }
                  }
            }

            setFilterText(formattedValue);
      };

      const handleMostrarCodigos = () => {
            setVisibleCodes(!visibleCodes);
            if (!visibleCodes) {
                  setFilterText("");
            }
      };

      const handleSelectCode = (codigoSelected) => {
            setCodigo(codigoSelected);
            setVisibleCodes(false);
            setFilterText("");
      };

      // Filtrar cuentas basado en el texto de filtro
      const cuentasFiltradas = cuentasContables.filter(cuenta =>
            cuenta.codigo.toLowerCase().includes(filterText.toLowerCase()) ||
            cuenta.descripcion.toLowerCase().includes(filterText.toLowerCase())
      );

      const isFormValid = () => {
            const codigoPattern = /^\d\.\d{2}\.\d\.\d{2}$/;
            const isCodigoValid = codigoPattern.test(codigo.trim());

            return isCodigoValid && nombre.trim() && categoria;
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card plan-cuentas-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdAccountBalance size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Plan de Cuentas</h3>
                              </div>
                        </div>
                  </div>

                  {isModalOpen && (
                        <div className="modal_overlay" onClick={handleCancelar}>
                              <div className="modal_container" onClick={(e) => e.stopPropagation()}>
                                    {!visibleCodes ? <>
                                          <div className="modal_header">
                                                <h2 className="modal_title">Crear Cuenta</h2>
                                                <div className="modal_icon">
                                                      <MdAccountBalance size={24} color="#36aad4" />
                                                </div>
                                          </div>

                                          <div className="modal_form">
                                                <div className="input_group">
                                                      <label htmlFor="codigo" className="input_label">
                                                            Código *
                                                      </label>
                                                      <div className="input_with_button">
                                                            <input
                                                                  type="text"
                                                                  id="codigo"
                                                                  value={codigo}
                                                                  onChange={handleCodigoChange}
                                                                  className="modal_input"
                                                                  placeholder="Ejemplo: 1.01.1.01"
                                                                  maxLength={9}
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  onClick={handleBuscarCodigo}
                                                                  title="Buscar código"
                                                            >
                                                                  <MdSearch size={18} />
                                                            </button>
                                                      </div>
                                                </div>

                                                <div className="input_group">
                                                      <label htmlFor="nombre" className="input_label">
                                                            Nombre *
                                                      </label>
                                                      <input
                                                            type="text"
                                                            id="nombre"
                                                            value={nombre}
                                                            onChange={handleNombreChange}
                                                            className="modal_input"
                                                            placeholder="Ingrese el nombre de la cuenta"
                                                            maxLength={100}
                                                      />
                                                </div>

                                                <div className="input_group">
                                                      <label htmlFor="auxiliar1" className="input_label">
                                                            Auxiliar Contable 1
                                                      </label>
                                                      <input
                                                            type="text"
                                                            id="auxiliar1"
                                                            value={auxiliarContable1}
                                                            onChange={handleAuxiliarChange(setAuxiliarContable1)}
                                                            className="modal_input"
                                                            placeholder="Solo letras permitidas"
                                                            maxLength={10}
                                                      />
                                                </div>

                                                <div className="input_group">
                                                      <label htmlFor="auxiliar2" className="input_label">
                                                            Auxiliar Contable 2
                                                      </label>
                                                      <input
                                                            type="text"
                                                            id="auxiliar2"
                                                            value={auxiliarContable2}
                                                            onChange={handleAuxiliarChange(setAuxiliarContable2)}
                                                            className="modal_input"
                                                            placeholder="Solo letras permitidas"
                                                            maxLength={10}
                                                      />
                                                </div>

                                                <div className="input_group">
                                                      <label htmlFor="categoria" className="input_label">
                                                            Categoría *
                                                      </label>
                                                      <select
                                                            id="categoria"
                                                            value={categoria}
                                                            onChange={(e) => setCategoria(e.target.value)}
                                                            className="modal_select"
                                                      >
                                                            <option value="">Seleccione una categoría</option>
                                                            {categorias.map((cat) => (
                                                                  <option key={cat} value={cat}>
                                                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </div>
                                          </div>

                                          <div className="modal_actions">
                                                <button
                                                      className="btn_cancel"
                                                      onClick={handleCancelar}
                                                >
                                                      Cancelar
                                                </button>
                                                <button
                                                      className="btn_accept"
                                                      onClick={handleAceptar}
                                                      disabled={!isFormValid()}
                                                >
                                                      Aceptar
                                                </button>
                                          </div>
                                    </> : <>
                                          <div className="codes_list_container">
                                                <div className="list_header">
                                                      <h3 className="list_title">Plan de Cuentas Contables</h3>
                                                      <button
                                                            className="close_list_button"
                                                            onClick={handleMostrarCodigos}
                                                            title="Cerrar lista"
                                                      >
                                                            ✕
                                                      </button>
                                                </div>

                                                <div className="filter_container">
                                                      <div className="input_group">
                                                            <label htmlFor="filter_input" className="input_label">
                                                                  Filtrar por código o descripción
                                                            </label>
                                                            <div className="filter_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="filter_input"
                                                                        value={filterText}
                                                                        onChange={handleFilterChange}
                                                                        className="modal_input"
                                                                        placeholder="Escriba código (ej: 101) o descripción..."
                                                                        maxLength={9}
                                                                  />
                                                                  <span className="filter_count">
                                                                        {cuentasFiltradas.length} de {cuentasContables.length} cuentas
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="codes_list">
                                                      {cuentasFiltradas.length > 0 ? (
                                                            cuentasFiltradas.map((cuenta, index) => (
                                                                  <div
                                                                        key={index}
                                                                        className="code_item"
                                                                        onClick={() => handleSelectCode(cuenta.codigo)}
                                                                        title={`Seleccionar código ${cuenta.codigo}`}
                                                                  >
                                                                        <div className="code_column">
                                                                              <span className="code_number">{cuenta.codigo}</span>
                                                                        </div>
                                                                        <div className="description_column">
                                                                              <span className="code_description">{cuenta.descripcion}</span>
                                                                        </div>
                                                                  </div>
                                                            ))
                                                      ) : (
                                                            <div className="no_results">
                                                                  <p>No se encontraron cuentas que coincidan con "{filterText}"</p>
                                                            </div>
                                                      )}
                                                </div>
                                          </div>
                                    </>}
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default PlanCuentas;
