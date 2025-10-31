import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const SearchInput = ({
      id,
      name,
      label,
      placeholder = "Buscar...",
      onSearch,
      loading = false,
      className = "modal-input",
      disabled = false
}) => {
      const [searchValue, setSearchValue] = useState('');

      const handleInputChange = (e) => {
            const value = e.target.value;
            setSearchValue(value);

            // Llamar a onSearch con un pequeño delay para evitar demasiadas llamadas
            if (onSearch) {
                  clearTimeout(window.searchTimeout);
                  window.searchTimeout = setTimeout(() => {
                        onSearch(value);
                  }, 300);
            }
      };

      const handleSearchClick = () => {
            if (onSearch) {
                  onSearch(searchValue);
            }
      };

      const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                  handleSearchClick();
            }
      };

      return (
            <div className="input-group">
                  {label && (
                        <label htmlFor={id} className="input-label">
                              {label}
                        </label>
                  )}
                  <div className="search_input_wrapper">
                        <input
                              type="text"
                              id={id}
                              name={name}
                              value={searchValue}
                              onChange={handleInputChange}
                              onKeyPress={handleKeyPress}
                              className={className}
                              placeholder={placeholder}
                              disabled={disabled || loading}
                        />
                        <button
                              type="button"
                              className="search_button"
                              onClick={handleSearchClick}
                              disabled={disabled || loading}
                              title="Buscar"
                        >
                              {loading ? (
                                    <div className="loading-spinner-small"></div>
                              ) : (
                                    <MdSearch size={16} />
                              )}
                        </button>
                  </div>
            </div>
      );
};

export default SearchInput;
