import React from "react";
import { Slider } from "@mui/material";
import "./FilterCard.css";
const FilterCard = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sliderMin,
  sliderMax,
}) => {
  return (
    <aside className="filter-container">
      <h3 className="filter-title">Filter by</h3>

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={selectedCategoryId}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="filter-select"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label>Price Range</label>
      <Slider
        value={priceRange}
        min={sliderMin}
        max={sliderMax}
        onChange={onPriceChange}
        valueLabelDisplay="auto"
        sx={{
          width: "90%",
          mt: 2,
          color: "var(--accent-color)",
          "& .MuiSlider-thumb": {
            backgroundColor: "var(--accent-color)",
          },
          "& .MuiSlider-track": {
            backgroundColor: "var(--accent-color)",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#555",
          },
        }}
      />

      <div className="price-values">
        <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
      </div>
    </aside>
  );
};

export default React.memo(FilterCard);
