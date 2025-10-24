import React, { useState, useEffect } from 'react';
import {
      IoSettingsSharp,
      IoBagHandleSharp,
      IoMenu,
      IoClose,
      IoSearch,
      IoAddOutline,
      IoHelpCircle,
      IoPersonCircleOutline
} from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaHome, FaBook, FaCashRegister } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa6";
import { useAuth } from '@context/AuthContext';
import logo from '@assets/images/logo.png';
import '@presentation-styles/layout/NavbarSidebar.scss';
import { useNavigate } from 'react-router-dom';

const NavbarSidebar = ({ children }) => {
      const { user } = useAuth();
      const [isMobile, setIsMobile] = useState(false);
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
            const checkScreenSize = () => {
                  setIsMobile(window.innerWidth <= 768);
                  if (window.innerWidth > 768) {
                        setSidebarOpen(false);
                  }
            };

            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
            return () => window.removeEventListener('resize', checkScreenSize);
      }, []);

      const toggleSidebar = () => {
            setSidebarOpen(!sidebarOpen);
      };

      const closeSidebar = () => {
            setSidebarOpen(false);
      };
      const sidebarItems = [
            { icon: FaHome, text: "Inicio", id: "home", link: "/home" },
            { icon: FaClipboardList, text: "Inventario", id: "inventory" },
            { icon: IoBagHandleSharp, text: "Compras", id: "purchases" },
            { icon: RiMoneyDollarCircleFill, text: "Tesorería", id: "treasury" },
            { icon: FaCashRegister, text: "Facturación en Caja", id: "billing" },
            { icon: IoSettingsSharp, text: "Activo Fijo", id: "assets" },
            { icon: FaBook, text: "Contabilidad", id: "accounting" },
            { icon: MdContacts, text: "Contactanos", id: "contact" }
      ];

      return (
            <div className="navbar-sidebar-container">
                  {/* Sidebar */}
                  <nav className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>

                        <ul className="sidebar-list">
                              {sidebarItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                          <li
                                                key={item.id}
                                                className="sidebar-item"
                                                onClick={() => navigate(item.link)}
                                          >
                                                <IconComponent className="sidebar-icon" />
                                                <span className="sidebar-text">{item.text}</span>
                                          </li>
                                    );
                              })}
                        </ul>
                  </nav>

                  {/* Overlay para móviles */}
                  {isMobile && sidebarOpen && (
                        <div className="sidebar-overlay" onClick={closeSidebar}></div>
                  )}

                  {/* Navbar */}
                  <header className={`navbar ${sidebarOpen && isMobile ? 'navbar-mobile-open' : ''}`}>
                        <div className="navbar-left">
                              {/* Botón hamburguesa para móviles */}
                              {isMobile && (
                                    <button className="mobile-menu-button" onClick={toggleSidebar}>
                                          {sidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                                    </button>
                              )}
                        </div>

                        <div className="navbar-center">
                              {/* Logo para desktop */}

                              <div className="navbar-logo">
                                    <img src={logo} alt="logo" />
                              </div>
                        </div>

                        <div className="navbar-right">
                              <div className="navbar-icons">
                                    <IoIosNotifications
                                          className="navbar-icon"
                                    />
                                    <IoSettingsSharp className="navbar-icon" />
                              </div>

                              <div className="navbar-actions">
                                    <button className="navbar-button" /* onClick={toggleSearchModal} */>
                                          <IoSearch className="button-icon" />
                                          <span>Buscar</span>
                                    </button>
                                    <button className="navbar-button" /* onClick={toggleHelpModal} */>
                                          <IoHelpCircle className="button-icon" />
                                          <span>Ayuda</span>
                                    </button>
                                    <button className="navbar-button navbar-button-primary" /* onClick={openModal} */>
                                          <IoAddOutline className="button-icon" />
                                          <span>Crear</span>
                                    </button>
                                    <button className="navbar-button" /* onClick={toggleUserModal} */>
                                          <IoPersonCircleOutline className="button-icon" />
                                          <span>{user?.data?.name || 'Usuario'}</span>
                                    </button>
                              </div>
                        </div>
                  </header>

                  {/* Contenido principal */}
                  <main className={`main-content ${sidebarOpen && isMobile ? 'main-content-mobile-open' : ''}`}>
                        {children}
                  </main>
            </div>
      );
};

export default NavbarSidebar;
