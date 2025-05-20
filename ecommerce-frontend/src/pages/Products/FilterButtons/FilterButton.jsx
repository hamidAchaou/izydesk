import React from "react";
import PropTypes from "prop-types";

const FilterButton = ({ label, categoryValue, isActive, setCategory }) => (
  <button
    className={`filter-btn ${isActive ? "active" : ""}`}
    onClick={() => setCategory(categoryValue)}
  >
    {label}
  </button>
);

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  categoryValue: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default React.memo(FilterButton);
