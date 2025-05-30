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
      <Table aria-label="table des catégories">
        <TableHead sx={{ bgcolor: "var(--secondary-color)" }}>
          <TableRow>
            <TableCell sx={{ color: "var(--accent-color)" }}>ID</TableCell>
            <TableCell sx={{ color: "var(--accent-color)" }}>Nom</TableCell>
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
                Aucune catégorie trouvée.
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
                  <Tooltip title="Modifier">
                    <IconButton
                      onClick={() => onEdit(category)}
                      sx={{ color: "var(--accent-color)" }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
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
            color: "var(--accent-color)", // Label et chiffres
          },
          "& .MuiTablePagination-selectLabel": {
            color: "var(--accent-color)", // "Lignes par page :"
          },
          "& .MuiTablePagination-displayedRows": {
            color: "var(--accent-color)", // "1–5 sur 5"
          },
          "& .MuiSelect-icon": {
            color: "var(--accent-color)", // Flèche du dropdown
          },
          "& .MuiInputBase-root": {
            color: "var(--accent-color)", // Nombre dans le dropdown
          },
          "& .MuiTablePagination-actions": {
            color: "var(--accent-color)", // Flèches de pagination
          },
        }}
      />
    </TableContainer>
  );
};

export default CategoryTable;
