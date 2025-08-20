// Dependencies
import React from 'react'
// Components
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import CreateClient from '../components/Creation/CreateClient'
// Styles
import '../styles/HomePage.scss'

const HomePage = () => {

  return (
    <div>
      <div className='main_container'>
        <Sidebar />
        <section className='home_content'>
          <Navbar/>

          <section className='home_content__creation'>
            <CreateClient />
          </section>
        </section>
      </div>
    </div>
  )
}

export default HomePage