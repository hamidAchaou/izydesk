import React from "react";
import PropTypes from "prop-types";
import "./Error.css"; // Create this CSS file for styling

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
