import React from "react";

const FormSection = ({ title, children }) => {
      return (
            <div className="form-section">
                  <h3 className="section-title">{title}</h3>
                  {children}
            </div>
      );
};

export default FormSection;
