// Dependencies
import React from 'react'
// Components
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
// Styles
import '../styles/HomePage.scss'

const HomePage = () => {
  return (
    <div>
      <div className='main_container'>
        <Sidebar />
        <section className='home_content'>
          <Navbar />
          <section className='home_content__shortcuts'>

            <h1>Inicio</h1>

            <div className="buttons">
              <button>
                <span>Accesos Directos</span>
              </button>
              <div className='line'/>
              <button>
                <span>Indicadores</span>
              </button>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default HomePage