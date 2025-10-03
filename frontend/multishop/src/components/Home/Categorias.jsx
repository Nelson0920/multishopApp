import React, { useState } from "react";
import "../../styles/Categorias.scss";
import { MdOutlineCategory } from "react-icons/md";
import { MdSearch } from "react-icons/md";

const Categorias = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [nombre, setNombre] = useState("");
      const [margenGanancia, setMargenGanancia] = useState("");
      const [porcentajeComision, setPorcentajeComision] = useState("");
      const [cuentaVentas, setCuentaVentas] = useState("");
      const [cuentaCompras, setCuentaCompras] = useState("");
      const [cuentaConsumos, setCuentaConsumos] = useState("");
      const [cuentaDevCompras, setCuentaDevCompras] = useState("");
      const [cuentaIVA, setCuentaIVA] = useState("");
      const [auxiliarVentas, setAuxiliarVentas] = useState("");
      const [auxiliarCompras, setAuxiliarCompras] = useState("");
      const [visibleCategorias, setVisibleCategorias] = useState(false);
      const [visibleAuxiliares, setVisibleAuxiliares] = useState(false);
      const [filterText, setFilterText] = useState("");
      const [currentField, setCurrentField] = useState("");

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
            { codigo: "5.03.1.02", descripcion: "Seguridad Social - Empresa" },
            { codigo: "2.03.1.01", descripcion: "IVA por Cobrar" },
            { codigo: "2.03.1.02", descripcion: "IVA por Pagar" },
            { codigo: "2.03.1.03", descripcion: "IVA Débito" },
            { codigo: "2.03.1.04", descripcion: "IVA Crédito" }
      ];

      const auxiliares = [
            { codigo: "A0000001", descripcion: "Cliente Facturación" },
            { codigo: "A0000002", descripcion: "Proveedor Importaciones" },
            { codigo: "A0000003", descripcion: "Cliente Mayoristas" },
            { codigo: "A0000004", descripcion: "Proveedor Nacionales" },
            { codigo: "A0000005", descripcion: "Cliente Retail" },
            { codigo: "A0000006", descripcion: "Proveedor Materiales" },
            { codigo: "A0000007", descripcion: "Cliente Corporativos" },
            { codigo: "A0000008", descripcion: "Proveedor Servicios" },
            { codigo: "A0000009", descripcion: "Cliente Premium" },
            { codigo: "A0000010", descripcion: "Proveedor Logística" },
            { codigo: "B0000001", descripcion: "Empleado Administrativo" },
            { codigo: "B0000002", descripcion: "Empleado Ventas" },
            { codigo: "B0000003", descripcion: "Empleado Producción" },
            { codigo: "B0000004", descripcion: "Empleado Soporte" },
            { codigo: "B0000005", descripcion: "Empleado Gerencial" },
            { codigo: "C0000001", descripcion: "Banco Principal" },
            { codigo: "C0000002", descripcion: "Banco Secundario" },
            { codigo: "C0000003", descripcion: "Cooperativa Financiera" },
            { codigo: "D0000001", descripcion: "Activo Fijo Vehículos" },
            { codigo: "D0000002", descripcion: "Activo Fijo Maquinaria" },
            { codigo: "D0000003", descripcion: "Activo Fijo Equipos" },
            { codigo: "E0000001", descripcion: "IVA Débito Mensual" },
            { codigo: "E0000002", descripcion: "IVA Crédito Mensual" },
            { codigo: "F0000001", descripcion: "Gasto Administrativo" },
            { codigo: "F0000002", descripcion: "Gasto Ventas" },
            { codigo: "F0000003", descripcion: "Gasto Financiero" }
      ];

      const handleAceptar = () => {
            setIsModalOpen(false);
            resetForm();
            setVisibleCategorias(false);
            setVisibleAuxiliares(false);
      };

      const handleCancelar = () => {
            setIsModalOpen(false);
            resetForm();
            setVisibleCategorias(false);
            setVisibleAuxiliares(false);
      };

      const handleOpenModal = () => {
            setIsModalOpen(true);
      };

      const resetForm = () => {
            setNombre("");
            setMargenGanancia("");
            setPorcentajeComision("");
            setCuentaVentas("");
            setAuxiliarVentas("");
            setCuentaCompras("");
            setAuxiliarCompras("");
            setCuentaConsumos("");
            setCuentaDevCompras("");
            setCuentaIVA("");
      };

      const handleBuscarCuenta = (field) => {
            setCurrentField(field);
            setVisibleCategorias(true);
            setFilterText("");
      };

      const handleBuscarAuxiliar = (field) => {
            setCurrentField(field);
            setVisibleAuxiliares(true);
            setFilterText("");
      };

      const handleFilterChange = (e) => {
            const value = e.target.value;
            setFilterText(value);
      };

      const handleMostrarCategorias = () => {
            setVisibleCategorias(!visibleCategorias);
            if (!visibleCategorias) {
                  setFilterText("");
                  setCurrentField("");
            }
      };

      const handleMostrarAuxiliares = () => {
            setVisibleAuxiliares(!visibleAuxiliares);
            if (!visibleAuxiliares) {
                  setFilterText("");
                  setCurrentField("");
            }
      };

      const handleSelectAccount = (account) => {
            const accountText = `${account.codigo} - ${account.descripcion}`;
            switch (currentField) {
                  case 'ventas':
                        setCuentaVentas(accountText);
                        break;
                  case 'compras':
                        setCuentaCompras(accountText);
                        break;
                  case 'consumos':
                        setCuentaConsumos(accountText);
                        break;
                  case 'devCompras':
                        setCuentaDevCompras(accountText);
                        break;
                  case 'iva':
                        setCuentaIVA(accountText);
                        break;
                  default:
                        break;
            }
            setVisibleCategorias(false);
            setFilterText("");
            setCurrentField("");
      };

      const handleSelectAuxiliar = (auxiliar) => {
            const auxiliarText = `${auxiliar.codigo} - ${auxiliar.descripcion}`;
            switch (currentField) {
                  case 'auxiliarVentas':
                        setAuxiliarVentas(auxiliarText);
                        break;
                  case 'auxiliarCompras':
                        setAuxiliarCompras(auxiliarText);
                        break;
                  default:
                        break;
            }
            setVisibleAuxiliares(false);
            setFilterText("");
            setCurrentField("");
      };

      const cuentasFiltradas = cuentasContables.filter(cuenta =>
            cuenta.codigo.toLowerCase().includes(filterText.toLowerCase()) ||
            cuenta.descripcion.toLowerCase().includes(filterText.toLowerCase())
      );

      const auxiliaresFiltrados = auxiliares.filter(auxiliar =>
            auxiliar.codigo.toLowerCase().includes(filterText.toLowerCase()) ||
            auxiliar.descripcion.toLowerCase().includes(filterText.toLowerCase())
      );

      const isFormValid = () => {
            const baseValidation = nombre.trim() && margenGanancia.trim() && porcentajeComision.trim() &&
                  cuentaVentas.trim() && cuentaCompras.trim() && cuentaConsumos.trim() &&
                  cuentaDevCompras.trim() && cuentaIVA.trim();

            const auxiliarVentasValidation = cuentaVentas.trim() ? auxiliarVentas.trim() && baseValidation : baseValidation;

            const auxiliarComprasValidation = cuentaCompras.trim() ? auxiliarCompras.trim() && auxiliarVentasValidation : auxiliarVentasValidation;

            return auxiliarComprasValidation;
      };

      return (
            <div className="feature_section">
                  <div className="feature_container">
                        <div className="feature_card categorias-card" onClick={handleOpenModal}>
                              <div className="card_icon">
                                    <MdOutlineCategory size={30} color="#36aad4" />
                              </div>
                              <div className="card_content">
                                    <h3 className="card_title">Categorías</h3>
                              </div>
                        </div>
                  </div>

                  {isModalOpen && (
                        <div className="modal_overlay" onClick={handleCancelar}>
                              <div className="modal_container" onClick={(e) => e.stopPropagation()}>
                                    <div className="modal_header">
                                          <h2 className="modal_title">Gestión de Categorías</h2>
                                          <div className="modal_icon">
                                                <MdOutlineCategory size={24} color="#36aad4" />
                                          </div>
                                    </div>
                                    {!visibleCategorias && !visibleAuxiliares ? <>
                                          <div className="modal_form">
                                                <div className="input_group">
                                                      <label htmlFor="nombre" className="input_label">
                                                            Nombre *
                                                      </label>
                                                      <input
                                                            type="text"
                                                            id="nombre"
                                                            value={nombre}
                                                            onChange={(e) => setNombre(e.target.value.toUpperCase())}
                                                            className="modal_input"
                                                            placeholder="Nombre de la categoría"
                                                            maxLength={50}
                                                      />
                                                </div>

                                                <div className="input_group">
                                                      <label htmlFor="margenGanancia" className="input_label">
                                                            Margen de Ganancia *
                                                      </label>
                                                      <input
                                                            type="text"
                                                            id="margenGanancia"
                                                            value={margenGanancia}
                                                            onChange={(e) => setMargenGanancia(e.target.value)}
                                                            className="modal_input"
                                                            placeholder="Ejemplo: 35%"
                                                            maxLength={10}
                                                      />
                                                </div>

                                                <div className="input_group">
                                                      <label htmlFor="porcentajeComision" className="input_label">
                                                            Porcentaje de Comisión *
                                                      </label>
                                                      <input
                                                            type="text"
                                                            id="porcentajeComision"
                                                            value={porcentajeComision}
                                                            onChange={(e) => setPorcentajeComision(e.target.value)}
                                                            className="modal_input"
                                                            placeholder="Ejemplo: 5%"
                                                            maxLength={10}
                                                      />
                                                </div>

                                                <div className="input_group">
                                                      <label htmlFor="cuentaVentas" className="input_label">
                                                            Cuenta Contable Ventas *
                                                      </label>
                                                      <div className="input_with_button">
                                                            <input
                                                                  type="text"
                                                                  id="cuentaVentas"
                                                                  value={cuentaVentas}
                                                                  className="modal_input readonly_input"
                                                                  placeholder="Seleccione una cuenta"
                                                                  maxLength={9}
                                                                  readOnly
                                                            />
                                                            <button
                                                                  type="button"
                                                                  className="search_button"
                                                                  onClick={() => handleBuscarCuenta('ventas')}
                                                                  title="Buscar cuentas"
                                                            >
                                                                  <MdSearch size={18} />
                                                            </button>
                                                      </div>
                                                </div>

                                                <div className="input_group_group">
                                                      <div className="input_group">
                                                            <label htmlFor="cuentaCompras" className="input_label">
                                                                  Cuenta Contable Compras *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="cuentaCompras"
                                                                        value={cuentaCompras}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione una cuenta"
                                                                        maxLength={9}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarCuenta('compras')}
                                                                        title="Buscar cuentas"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                      </div>

                                                      <div className="input_group sub_field">
                                                            <label htmlFor="auxiliarCompras" className="input_label">
                                                                  ↳ Auxiliar 2 *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="auxiliarCompras"
                                                                        value={auxiliarCompras}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione un auxiliar"
                                                                        maxLength={50}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarAuxiliar('auxiliarCompras')}
                                                                        title="Buscar auxiliares"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                            <div className="field_info">
                                                                  <p className="auxiliar_rules">Reglas de Auxiliar disponibles: A, B, C, D, E, F</p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="input_group_group">

                                                      <div className="input_group">
                                                            <label htmlFor="cuentaConsumos" className="input_label">
                                                                  Cuenta Contable Consumos *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="cuentaConsumos"
                                                                        value={cuentaConsumos}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione una cuenta"
                                                                        maxLength={9}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarCuenta('consumos')}
                                                                        title="Buscar cuentas"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                      </div>
                                                      <div className="input_group sub_field">
                                                            <label htmlFor="auxiliarCompras" className="input_label">
                                                                  ↳ Auxiliar 1 *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="auxiliarCompras"
                                                                        value={auxiliarCompras}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione un auxiliar"
                                                                        maxLength={50}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarAuxiliar('auxiliarCompras')}
                                                                        title="Buscar auxiliares"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                            <div className="field_info">
                                                                  <p className="auxiliar_rules">Reglas de Auxiliar disponibles: A, B, C, D, E, F</p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="input_group_group">

                                                      <div className="input_group">
                                                            <label htmlFor="cuentaDevCompras" className="input_label">
                                                                  Cuenta Contable Dev. Compras *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="cuentaDevCompras"
                                                                        value={cuentaDevCompras}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione una cuenta"
                                                                        maxLength={9}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarCuenta('devCompras')}
                                                                        title="Buscar cuentas"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                      </div>
                                                      <div className="input_group sub_field">
                                                            <label htmlFor="auxiliarCompras" className="input_label">
                                                                  ↳ Auxiliar 2 *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="auxiliarCompras"
                                                                        value={auxiliarCompras}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione un auxiliar"
                                                                        maxLength={50}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarAuxiliar('auxiliarCompras')}
                                                                        title="Buscar auxiliares"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                            <div className="field_info">
                                                                  <p className="auxiliar_rules">Reglas de Auxiliar disponibles: A, B, C, D, E, F</p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="input_group_group">

                                                      <div className="input_group">
                                                            <label htmlFor="cuentaIVA" className="input_label">
                                                                  Cuenta Contable IVA *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="cuentaIVA"
                                                                        value={cuentaIVA}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione una cuenta"
                                                                        maxLength={9}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarCuenta('iva')}
                                                                        title="Buscar cuentas"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                      </div>
                                                      <div className="input_group sub_field">
                                                            <label htmlFor="auxiliarCompras" className="input_label">
                                                                  ↳ Auxiliar 1 *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="auxiliarCompras"
                                                                        value={auxiliarCompras}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione un auxiliar"
                                                                        maxLength={50}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarAuxiliar('auxiliarCompras')}
                                                                        title="Buscar auxiliares"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                            <div className="field_info">
                                                                  <p className="auxiliar_rules">Reglas de Auxiliar disponibles: A, B, C, D, E, F</p>
                                                            </div>
                                                      </div>
                                                      <div className="input_group sub_field">
                                                            <label htmlFor="auxiliarCompras" className="input_label">
                                                                  ↳ Auxiliar 2 *
                                                            </label>
                                                            <div className="input_with_button">
                                                                  <input
                                                                        type="text"
                                                                        id="auxiliarCompras"
                                                                        value={auxiliarCompras}
                                                                        className="modal_input readonly_input"
                                                                        placeholder="Seleccione un auxiliar"
                                                                        maxLength={50}
                                                                        readOnly
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        className="search_button"
                                                                        onClick={() => handleBuscarAuxiliar('auxiliarCompras')}
                                                                        title="Buscar auxiliares"
                                                                  >
                                                                        <MdSearch size={18} />
                                                                  </button>
                                                            </div>
                                                            <div className="field_info">
                                                                  <p className="auxiliar_rules">Reglas de Auxiliar disponibles: A, B, C, D, E, F</p>
                                                            </div>
                                                      </div>
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
                                    </> : visibleAuxiliares ? <>
                                          <div className="categorias_list_container">
                                                <div className="filter_container">
                                                      <div className="input_group">
                                                            <div className="title">
                                                                  <label htmlFor="filter_input" className="input_label">
                                                                        Filtrar por código o descripción
                                                                  </label>
                                                                  <button
                                                                        className="close_list_button"
                                                                        onClick={handleMostrarAuxiliares}
                                                                        title="Cerrar lista"
                                                                  >
                                                                        ✕
                                                                  </button>
                                                            </div>
                                                            <div className="filter_input_wrapper">
                                                                  <input
                                                                        type="text"
                                                                        id="filter_input"
                                                                        value={filterText}
                                                                        onChange={handleFilterChange}
                                                                        className="modal_input"
                                                                        placeholder="Escriba código (ej: A0000001) o descripción..."
                                                                        maxLength={50}
                                                                  />
                                                                  <span className="filter_count">
                                                                        {auxiliaresFiltrados.length} de {auxiliares.length} auxiliares
                                                                  </span>
                                                            </div>

                                                      </div>
                                                </div>

                                                <div className="codes_list">
                                                      {auxiliaresFiltrados.length > 0 ? (
                                                            auxiliaresFiltrados.map((auxiliar, index) => (
                                                                  <div
                                                                        key={index}
                                                                        className="code_item"
                                                                        onClick={() => handleSelectAuxiliar(auxiliar)}
                                                                        title={`Seleccionar código ${auxiliar.codigo}`}
                                                                  >
                                                                        <div className="code_column">
                                                                              <span className="code_number">{auxiliar.codigo}</span>
                                                                        </div>
                                                                        <div className="description_column">
                                                                              <span className="code_description">{auxiliar.descripcion}</span>
                                                                        </div>
                                                                  </div>
                                                            ))
                                                      ) : (
                                                            <div className="no_results">
                                                                  <p>No se encontraron auxiliares que coincidan con "{filterText}"</p>
                                                            </div>
                                                      )}
                                                </div>
                                          </div>
                                    </> : <>
                                          <div className="categorias_list_container">
                                                <div className="filter_container">
                                                      <div className="input_group">
                                                            <div className="title">
                                                                  <label htmlFor="filter_input" className="input_label">
                                                                        Filtrar por código o descripción
                                                                  </label>
                                                                  <button
                                                                        className="close_list_button"
                                                                        onClick={handleMostrarCategorias}
                                                                        title="Cerrar lista"
                                                                  >
                                                                        ✕
                                                                  </button>
                                                            </div>
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
                                                                        onClick={() => handleSelectAccount(cuenta)}
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

export default Categorias;
