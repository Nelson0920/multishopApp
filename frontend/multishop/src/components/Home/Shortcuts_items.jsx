import React from 'react'

const Shortcuts_items = ({ item, children, title, onClick }) => {
      const handleClick = () => {
            if (onClick) {
                  onClick(item);
            }
      };

      return (
            <div
                  className="card_item"
                  key={item.id}
                  onClick={handleClick}
            >
                  <div className="card_icon">
                        {children}
                  </div>
                  <div className="card_content">
                        <span className="card_title">{title}</span>
                        <div className="card_overlay"></div>
                        <div className="hover_ripple"></div>
                  </div>
            </div>
      )
}

export default Shortcuts_items