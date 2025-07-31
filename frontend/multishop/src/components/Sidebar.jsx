// Dependecies
import React                                        from 'react'
import { IoSettingsSharp }                          from "react-icons/io5"
import { FaHome }                                   from "react-icons/fa"
// Styles
import '../styles/Sidebar.scss'

const Sidebar = () => {
  return (
    <nav id='sidebar_container'>
      <ul className='sidebar_list'>
        <li>
          <FaHome className='icon_sidebar'/>
          <span className="sidebar_text">Inicio</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Inventario</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Compras</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Tesorería</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Facturación en Caja</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Activo Fijo</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Contabilidad</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Contactanos</span>
        </li>
      </ul>
    </nav>
  );
};


export default Sidebar