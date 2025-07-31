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
    </div>
  )
}

export default CreateClient