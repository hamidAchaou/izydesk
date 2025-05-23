import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCategories = categories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table aria-label="categories table">
        <TableHead sx={{ bgcolor: "var(--secondary-color)" }}>
          <TableRow>
            <TableCell sx={{ color: "var(--accent-color)" }}>ID</TableCell>
            <TableCell sx={{ color: "var(--accent-color)" }}>Name</TableCell>
            <TableCell align="center" sx={{ color: "var(--accent-color)" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                sx={{ color: "var(--primary-color)" }}
              >
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell sx={{ color: "var(--primary-color)" }}>
                  {category.id}
                </TableCell>
                <TableCell sx={{ color: "var(--primary-color)" }}>
                  {category.name}
                </TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => onEdit(category)}
                      sx={{ color: "var(--accent-color)" }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => onDelete(category)}
                      sx={{ color: "var(--accent-color)" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={categories.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  sx={{
    bgcolor: "var(--secondary-color)",
    "& .MuiTablePagination-toolbar": {
      color: "var(--accent-color)", // Label and numbers
    },
    "& .MuiTablePagination-selectLabel": {
      color: "var(--accent-color)", // "Rows per page:"
    },
    "& .MuiTablePagination-displayedRows": {
      color: "var(--accent-color)", // "1–5 of 5"
    },
    "& .MuiSelect-icon": {
      color: "var(--accent-color)", // Dropdown arrow
    },
    "& .MuiInputBase-root": {
      color: "var(--accent-color)", // Number inside dropdown
    },
    "& .MuiTablePagination-actions": {
      color: "var(--accent-color)", // Pagination arrows
    },
  }}
/>

    </TableContainer>
  );
};

export default CategoryTable;
