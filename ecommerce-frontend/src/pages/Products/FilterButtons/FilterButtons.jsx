import React from "react";
import FilterButton from "./FilterButton";
import PropTypes from "prop-types";

const FilterButtons = ({ category, setCategory }) => (
  <div className="filter-buttons d-flex justify-content-center mb-5">
    {["all", "men", "women", "kids"].map((categoryValue) => (
      <FilterButton
        key={categoryValue}
        label={categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)}
        categoryValue={categoryValue}
        isActive={category === categoryValue}
        setCategory={setCategory}
      />
    ))}
  </div>
);

FilterButtons.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default React.memo(FilterButtons);
