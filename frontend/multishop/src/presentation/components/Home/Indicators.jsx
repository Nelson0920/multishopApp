// Dependencies
import React from 'react'
// Styles
import '@presentation-styles/components/Indicators.scss'

const Indicators = () => {
  return (
    <div>
      <section className='indicators_header'>
        <span><strong>Ultima Actualización:</strong> 30/07/2025 - 10:50 p.m</span>

        <button>
          Actualizar indicadores
        </button>
      </section>

      <div className='indicators_container'>
        <section className='indicator'>
          <div className='indicator_header'>
            <h2>Indicador de Prueba</h2>
            {/* Icono */}
          </div>

          <div className='period_input'>
            <label>Periodo:</label>
            <select className="period-dropdown">
              <option>Semestre actual</option>
              <option>Año actual</option>
              <option>Año anterior</option>
            </select>
          </div>

          <div className='indicator_content'>

          </div>

        </section>
        <section className='indicator'>
          <div className='indicator_header'>
            <h2>Indicador de Prueba</h2>
            {/* Icono */}
          </div>

          <div className='period_input'>
            <label>Periodo:</label>
            <select className="period-dropdown">
              <option>Semestre actual</option>
              <option>Año actual</option>
              <option>Año anterior</option>
            </select>
          </div>

          <div className='indicator_content'>

          </div>

        </section>
        <section className='indicator'>
          <div className='indicator_header'>
            <h2>Indicador de Prueba</h2>
            {/* Icono */}
          </div>

          <div className='period_input'>
            <label>Periodo:</label>
            <select className="period-dropdown">
              <option>Semestre actual</option>
              <option>Año actual</option>
              <option>Año anterior</option>
            </select>
          </div>

          <div className='indicator_content'>

          </div>

        </section>
        <section className='indicator'>
          <div className='indicator_header'>
            <h2>Indicador de Prueba</h2>
            {/* Icono */}
          </div>

          <div className='period_input'>
            <label>Periodo:</label>
            <select className="period-dropdown">
              <option>Semestre actual</option>
              <option>Año actual</option>
              <option>Año anterior</option>
            </select>
          </div>

          <div className='indicator_content'>

          </div>

        </section>
        <section className='indicator'>
          <div className='indicator_header'>
            <h2>Indicador de Prueba</h2>
            {/* Icono */}
          </div>

          <div className='period_input'>
            <label>Periodo:</label>
            <select className="period-dropdown">
              <option>Semestre actual</option>
              <option>Año actual</option>
              <option>Año anterior</option>
            </select>
          </div>

          <div className='indicator_content'>

          </div>

        </section>

      </div>
    </div>
  )
}

export default Indicators