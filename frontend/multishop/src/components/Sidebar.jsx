// Dependecies
import React                                        from 'react'
import { IoSettingsSharp } from "react-icons/io5"
// Styles
import '../styles/Sidebar.scss'


const Sidebar = () => {
  return (
    <nav id='sidebar_container'>
      <ul className='sidebar_list'>
        <li><IoSettingsSharp/></li>
        <li><IoSettingsSharp/></li>
        <li><IoSettingsSharp/></li>
        <li><IoSettingsSharp/></li>
        <li><IoSettingsSharp/></li>
        <li><IoSettingsSharp/></li>
      </ul>
    </nav>
  )
}

export default Sidebar