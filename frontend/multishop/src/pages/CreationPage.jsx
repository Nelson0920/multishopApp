import React from 'react'
import NavbarSidebar from '../components/NavbarSidebar'
import CreateClient from '../components/Creation/CreateClient'
import '../styles/HomePage.scss'

const CreationPage = () => {

  return (
    <NavbarSidebar>
      <div className="page-container">
        <section className='home_content__shortcuts'>
          <h1>Creación</h1>
        </section>
        <section className='home_content__creation'>
          <CreateClient />
        </section>
      </div>
    </NavbarSidebar>
  )
}

export default CreationPage