// Dependecies
import React                                      from 'react'
import { IoSettingsSharp , IoBagHandleSharp}      from "react-icons/io5"
import { FaHome, FaBook, FaCashRegister }         from "react-icons/fa"
import { MdContacts }                             from "react-icons/md"
import { MdAttachMoney }                          from "react-icons/md"
import { RiMoneyDollarCircleFill }                from "react-icons/ri"
import { FaClipboardList }                        from "react-icons/fa6"
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
          <FaClipboardList className='icon_sidebar'/>
          <span className="sidebar_text">Inventario</span>
        </li>
        <li>
          <IoBagHandleSharp className='icon_sidebar'/>
          <span className="sidebar_text">Compras</span>
        </li>
        <li>
          <RiMoneyDollarCircleFill className='icon_sidebar'/>
          <span className="sidebar_text">Tesorería</span>
        </li>
        <li>
          <FaCashRegister className='icon_sidebar'/>
          <span className="sidebar_text">Facturación en Caja</span>
        </li>
        <li>
          <IoSettingsSharp className='icon_sidebar'/>
          <span className="sidebar_text">Activo Fijo</span>
        </li>
        <li>
          <FaBook className='icon_sidebar'/>
          <span className="sidebar_text">Contabilidad</span>
        </li>
        <li>
          <MdContacts className='icon_sidebar'/>
          <span className="sidebar_text">Contactanos</span>
        </li>
      </ul>
    </nav>
  )
}


export default Sidebar