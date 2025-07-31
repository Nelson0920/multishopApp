import React, { useState } from 'react'
import { IoSearch  } from "react-icons/io5"
// Styles
import '../../styles/SearchModal.scss'

const SearchModal = ({ onClose }) => {
  const [searchFilter, setSearchFilter] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const mockSearchResults = [
    {
      id: "1",
      identification: "023565656",
      name: "0 - Alex Toro",
      type: "Cliente",
    },
    {
      id: "2",
      identification: "987654321",
      name: "1 - Alexandra Pérez",
      type: "Proveedor",
    },
    {
      id: "3",
      identification: "456789123",
      name: "2 - Alejandro Ruiz",
      type: "Cliente",
    },
  ]

  const categories = ["Todos", "Clientes", "Proveedores", "Usuarios y más", "Otros"]

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 0) {
      const filtered = mockSearchResults.filter(
        (result) =>
          (searchFilter === "Todos" || result.type === searchFilter) &&
          (result.name.toLowerCase().includes(query.toLowerCase()) ||
            result.identification.includes(query))
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const handleFilterChange = (e) => {
    const filter = e.target.value
    setSearchFilter(filter)

    // Refiltrar si ya hay una búsqueda activa
    if (searchQuery.length > 0) {
      const filtered = mockSearchResults.filter(
        (result) =>
          (filter === "Todos" || result.type === filter) &&
          (result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.identification.includes(searchQuery))
      )
      setSearchResults(filtered)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  const handleCloseModal = () => {
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-container">
            <select
              className="search-filter-dropdown"
              value={searchFilter}
              onChange={handleFilterChange}
            >
              {categories.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>

            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-modal-input"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={clearSearch}>
                  ×
                </button>
              )}
            </div>

            <button className="search-submit-btn">
              <IoSearch className='icon_search_modal'/>
            </button>
          </div>

          <button className="cancel-search-btn" onClick={handleCloseModal}>
            Cancelar
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="search-results">
            <div className="results-header">
              <span className="results-label">Identificación</span>
              <span className="results-label">Nombre</span>
              <span className="results-label">Tipo</span>
            </div>

            <div className="results-list">
              {searchResults.map((result) => (
                <div key={result.id} className="result-item">
                  <span className="result-id">{result.identification}</span>
                  <span className="result-name">{result.name}</span>
                  <span className="result-type">{result.type}</span>
                </div>
              ))}
            </div>

            <button className="see-more-results">+ Ver más resultados</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchModal
