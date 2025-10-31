import React from "react";
import { MdSearch } from "react-icons/md";

/**
 * Lista reutilizable con búsqueda para seleccionar elementos (lookup).
 */
const LookupList = ({
      listType,
      title,
      placeholder,
      items = [],
      isLoading = false,
      searchTerm = "",
      onSearchChange,
      onSelect,
      onBack,
      getKey,
      renderPrimary,
      renderSecondary,
}) => {
      const TITLE_BY_TYPE = {
            plan_cuentas: 'Seleccionar Cuenta Contable',
            auxiliares: 'Seleccionar Auxiliar',
            categorias: 'Seleccionar Categoría',
            condiciones: 'Seleccionar Condiciones de Pago',
            isrl: 'Seleccionar Concepto de Retención ISRL',
            usuarios: 'Seleccionar Vendedor',
      };
      const PLACEHOLDER_BY_TYPE = {
            plan_cuentas: 'Buscar por código o nombre...',
            auxiliares: 'Buscar por código o nombre...',
            categorias: 'Buscar por nombre...',
            condiciones: 'Buscar por días o descuento...',
            isrl: 'Buscar por código o concepto...',
            default: 'Buscar por nombre o RIF...'
      };

      const PRIMARY_RENDERERS = {
            plan_cuentas: (item) => item?.codigo,
            auxiliares: (item) => item?.auxiliar,
            categorias: (item) => item?.name,
            condiciones: (item) => `${item?.days} días`,
            isrl: (item) => item?.code,
            default: (item) => item?.name,
      };
      const SECONDARY_RENDERERS = {
            plan_cuentas: (item) => item?.nombre,
            auxiliares: (item) => item?.nombre,
            categorias: (item) => item?.name,
            condiciones: (item) => `${item?.discount_percentage}% descuento`,
            isrl: (item) => item?.name,
            default: (item) => item?.rif,
      };

      const computedTitle = title ?? (TITLE_BY_TYPE[listType] || 'Seleccionar');
      const computedPlaceholder = placeholder ?? (PLACEHOLDER_BY_TYPE[listType] || PLACEHOLDER_BY_TYPE.default);

      const keyGetter = getKey ?? ((item, index) => item?.id ?? `${listType ?? 'item'}-${index}`);
      const primaryRenderer = renderPrimary ?? (PRIMARY_RENDERERS[listType] || PRIMARY_RENDERERS.default);
      const secondaryRenderer = renderSecondary ?? (SECONDARY_RENDERERS[listType] || SECONDARY_RENDERERS.default);
      return (
            <div className="modal-form-container" role="dialog" aria-modal="true" aria-label={computedTitle}>
                  <div className="modal-header">
                        <h2 className="modal-title">{computedTitle}</h2>
                        <div className="modal-icon">
                              <MdSearch size={24} color="#36aad4" />
                        </div>
                  </div>

                  <div className="filter_container">
                        <label className="input_label" htmlFor="lookup-search-input">Buscar:</label>
                        <div className="filter_input_wrapper">
                              <input
                                    type="text"
                                    id="lookup-search-input"
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange?.(e.target.value)}
                                    className="modal_input"
                                    placeholder={computedPlaceholder}
                                    aria-label="Buscar"
                              />
                              <div className="filter_count">
                                    {items?.length ?? 0} resultados
                              </div>
                        </div>
                  </div>

                  <div className="codes_list" role="listbox" aria-label="Resultados de búsqueda">
                        {isLoading ? (
                              <div className="loading_container">
                                    <div className="loading_spinner"></div>
                              </div>
                        ) : !items || items.length === 0 ? (
                              <div className="no_results">No se encontraron resultados</div>
                        ) : (
                              items.map((item, index) => (
                                    <div
                                          key={keyGetter(item, index)}
                                          className="code_item"
                                          role="option"
                                          tabIndex={0}
                                          onClick={() => onSelect?.(item)}
                                          onKeyDown={(e) => { if (e.key === 'Enter') onSelect?.(item) }}
                                    >
                                          <div className="code_item_code">{primaryRenderer(item)}</div>
                                          {secondaryRenderer(item) && (
                                                <div className="code_item_name">{secondaryRenderer(item)}</div>
                                          )}
                                          {item.auxiliarContable1 && (
                                                <div className="code_item_auxiliar">A1: {item.auxiliarContable1}</div>
                                          )}
                                          {item.auxiliarContable2 && (
                                                <div className="code_item_auxiliar">A2: {item.auxiliarContable2}</div>
                                          )}


                                    </div>
                              ))
                        )}
                  </div>

                  <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onBack} aria-label="Volver">Volver</button>
                  </div>
            </div>
      );
};

export default LookupList;


