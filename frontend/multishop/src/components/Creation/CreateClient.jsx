// Dependencies
import React from 'react'
// Styles
import '../../styles/CreateClient.scss'

const CreateClient = () => {
  return (
    <div id='client_mainContainer'>
      <div className='creation_header'>
        <h1>Crear un Tercero</h1>
        <span>Todos los campos marcados con <a id='red_creation'>*</a> son de caracter obligatorio</span>
      </div>

      <div className='creation_type'>
        <h1>Tipo de Tercero</h1>
        <section className='creation_types'>
          <div className='creation_type_item'>
            <div className='creation_type_checkbox'>
              <input type="checkbox"/>
              <label htmlFor="Cliente">Clientes</label>
            </div>
            <section className='creation_type_description'>
              <span>Descripción de que son clientes</span>
            </section>
          </div>
          <div className='creation_type_item'>
            <div className='creation_type_checkbox'>
              <input type="checkbox"/>
              <label htmlFor="Cliente">Proveedores</label>
            </div>
            <section className='creation_type_description'>
              <span>Descripción de que son proveedores</span>
            </section>
          </div>
          <div className='creation_type_item'>
            <div className='creation_type_checkbox'>
              <input type="checkbox"/>
              <label htmlFor="Cliente">Otros</label>
            </div>
            <section className='creation_type_description'>
              <span>Descripción de que son otros</span>
            </section>
          </div>
        </section>
      </div>

      <div className="creation_form">
        <h1>
          <span id="red_icon_form">*</span> Datos Básicos
        </h1>
        <form className="form_grid">
          <div className="form_column">
            <div className="form_group">
              <label htmlFor="tipo">Tipo</label>
              <select name="tipo" id="tipo" className="form_select">
                <option value="empresa">Empresa</option>
                <option value="persona">Persona Natural</option>
              </select>
            </div>

            <div className="form_group">
              <label htmlFor="tipoIdentificacion" className="required_label">
                Tipo de identificación
              </label>
              <select name="tipoIdentificacion" id="tipoIdentificacion" className="form_select">
                <option value="nit">NIT</option>
                <option value="cedula">Cédula</option>
              </select>
            </div>

            <div className="form_group">
              <label htmlFor="identificacion" className="required_label">
                Identificación
              </label>
              <div className="identification_group">
                <input
                  type="text"
                  name="identificacion"
                  id="identificacion"
                  className="form_input identification_input"
                />
                <span className="dv_label">Dv</span>
              </div>
            </div>

            <div className="form_group">
              <button type="button" className="autocomplete_btn">
                Autocompletar datos
                <span className="info_icon">?</span>
              </button>
            </div>

            <div className="form_group">
              <label htmlFor="codigoSucursal">Código de la sucursal</label>
              <input type="text" name="codigoSucursal" id="codigoSucursal" className="form_input" defaultValue="0" />
            </div>
          </div>

          <div className="form_column">
            <div className="form_group">
              <label htmlFor="razonSocial" className="required_label">
                Razón social
              </label>
              <input type="text" name="razonSocial" id="razonSocial" className="form_input" />
            </div>

            <div className="form_group">
              <label htmlFor="nombreComercial">Nombre comercial</label>
              <input type="text" name="nombreComercial" id="nombreComercial" className="form_input" />
            </div>

            <div className="form_group">
              <label htmlFor="ciudad">Ciudad</label>
              <input type="text" name="ciudad" id="ciudad" className="form_input" />
            </div>

            <div className="form_group">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" name="direccion" id="direccion" className="form_input" />
            </div>
          </div>

          <div className="phone_section">
            <div className="phone_group">
              <div className="phone_field">
                <label htmlFor="indicativo">Indicativo</label>
                <input
                  type="text"
                  name="indicativo"
                  id="indicativo"
                  className="form_input phone_input"
                  defaultValue="414"
                />
              </div>
              <div className="phone_field">
                <label htmlFor="telefono"># de Teléfono</label>
                <input type="text" name="telefono" id="telefono" className="form_input phone_input" />
              </div>
              <button type="button" className="delete_btn">
                Eliminar
              </button>
            </div>
            <button type="button" className="add_phone_btn">
              + Agregar otro Teléfono
            </button>
          </div>
        </form>
      </div>

            <div className="billing_form">
        <h1>
          Datos para facturación y envío
          <span className="info_icon">?</span>
        </h1>
        <form className="billing_grid">
          <div className="billing_column">
            <div className="form_group">
              <label htmlFor="nombresContacto">Nombres del contacto</label>
              <input
                type="text"
                name="nombresContacto"
                id="nombresContacto"
                className="form_input"
                defaultValue="Jose"
              />
            </div>

            <div className="form_group">
              <label htmlFor="apellidosContacto">Apellidos del contacto</label>
              <input
                type="text"
                name="apellidosContacto"
                id="apellidosContacto"
                className="form_input"
                defaultValue="Cardenas"
              />
            </div>

            <div className="form_group">
              <label htmlFor="correoElectronico">Correo electrónico</label>
              <input
                type="email"
                name="correoElectronico"
                id="correoElectronico"
                className="form_input"
                defaultValue="almacenes-rosa@mail.com"
              />
            </div>

            <div className="form_group">
              <label htmlFor="tipoRegimenIVA">Tipo de régimen IVA</label>
              <select name="tipoRegimenIVA" id="tipoRegimenIVA" className="form_select">
                <option value="responsable">Responsable de IVA</option>
                <option value="no-responsable">No responsable de IVA</option>
              </select>
            </div>

            <div className="phone_group_billing">
              <div className="phone_field">
                <label htmlFor="indicativoBilling">Indicativo</label>
                <input
                  type="text"
                  name="indicativoBilling"
                  id="indicativoBilling"
                  className="form_input phone_input"
                  defaultValue="605"
                />
              </div>
              <div className="phone_field">
                <label htmlFor="telefonoBilling"># de Teléfono</label>
                <input
                  type="text"
                  name="telefonoBilling"
                  id="telefonoBilling"
                  className="form_input phone_input"
                  defaultValue="6321475"
                />
              </div>
            </div>

            <div className="form_group">
              <label htmlFor="codigoPostal">Código postal</label>
              <input type="text" name="codigoPostal" id="codigoPostal" className="form_input" defaultValue="082001" />
            </div>
          </div>

          <div className="billing_column">
            <div className="fiscal_responsibility">
              <h3>Responsabilidad fiscal</h3>
              <p className="fiscal_description">
                Verifica la responsabilidad en el RUT de tu cliente, mínimo asignar R-99-PN
              </p>

              <div className="fiscal_options">
                <div className="fiscal_option">
                  <input type="checkbox" id="o13" name="fiscal" value="O-13" />
                  <label htmlFor="o13">
                    <span className="fiscal_code">O-13</span>
                    <span className="fiscal_description">Gran contribuyente</span>
                  </label>
                </div>

                <div className="fiscal_option">
                  <input type="checkbox" id="o15" name="fiscal" value="O-15" />
                  <label htmlFor="o15">
                    <span className="fiscal_code">O-15</span>
                    <span className="fiscal_description">Autorretenedor</span>
                  </label>
                </div>

                <div className="fiscal_option">
                  <input type="checkbox" id="o23" name="fiscal" value="O-23" />
                  <label htmlFor="o23">
                    <span className="fiscal_code">O-23</span>
                    <span className="fiscal_description">Agente de retención IVA</span>
                  </label>
                </div>

                <div className="fiscal_option">
                  <input type="checkbox" id="o47" name="fiscal" value="O-47" />
                  <label htmlFor="o47">
                    <span className="fiscal_code">O-47</span>
                    <span className="fiscal_description">Régimen simple de tributación</span>
                  </label>
                </div>

                <div className="fiscal_option">
                  <input type="checkbox" id="r99pn" name="fiscal" value="R-99-PN" defaultChecked />
                  <label htmlFor="r99pn">
                    <span className="fiscal_code">R-99-PN</span>
                    <span className="fiscal_description">No aplica - Otros</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClient