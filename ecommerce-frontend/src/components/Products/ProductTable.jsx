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
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDetails = (product) => setSelectedProduct(product);
  const closeDetails = () => setSelectedProduct(null);

  const paginatedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Variables CSS pour les couleurs
  const colors = {
    primary: "var(--primary-color)",
    secondary: "var(--secondary-color)",
    accent: "var(--accent-color)",
    accentHover: "var(--accent-hover-color)",
    background: "var(--background-color)",
    text: "var(--text-color)",
    lightText: "var(--light-text-color)",
    border: "var(--border-color)",
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table aria-label="tableau des produits">
          <TableHead
            sx={{ bgcolor: colors.secondary, color: colors.background }}
          >
            <TableRow>
              <TableCell sx={{ color: colors.accent }}>Image</TableCell>
              <TableCell sx={{ color: colors.accent }}>Nom</TableCell>
              <TableCell sx={{ color: colors.accent }}>Catégorie</TableCell>
              <TableCell sx={{ color: colors.accent }}>Prix</TableCell>
              <TableCell sx={{ color: colors.accent }}>Stock</TableCell>
              <TableCell align="center" sx={{ color: colors.accent }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ color: colors.lightText }}
                >
                  Aucun produit trouvé.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: colors.border,
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: colors.lightText,
                        }}
                      >
                        Pas d'image
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ color: colors.primary }}>
                    {product.name}
                  </TableCell>
                  <TableCell sx={{ color: colors.primary }}>
                    {product.category?.name || "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: colors.primary }}>
                    {typeof product.price === "number"
                      ? `${product.price.toFixed(2)} €`
                      : ""}
                  </TableCell>
                  <TableCell sx={{ color: colors.primary }}>
                    {product.stock}
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    <Tooltip title="Modifier">
                      <IconButton
                        onClick={() => onEdit(product)}
                        sx={{ color: colors.primary }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton
                        onClick={() => onDelete(product)}
                        sx={{ color: colors.primary }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => openDetails(product)}
                      sx={{
                        ml: 1,
                        borderColor: colors.primary,
                        color: colors.primary,
                        "&:hover": {
                          borderColor: colors.accentHover,
                          color: colors.accentHover,
                        },
                      }}
                    >
                      Voir plus
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            bgcolor: colors.secondary,
            color: colors.primary,
            "& .MuiTablePagination-actions": { color: colors.primary },
            "& .MuiTablePagination-selectLabel": { color: colors.primary },
            "& .MuiTablePagination-displayedRows": { color: colors.primary },
            "& .MuiSelect-icon": { color: colors.primary },
            "& .MuiInputBase-root": { color: colors.primary },
          }}
        />
      </TableContainer>

      {/* Modal détails */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={closeDetails}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: colors.secondary,
            color: colors.primary,
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: `1px solid ${colors.border}` }}>
          Détails du produit
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}
        >
          {selectedProduct && (
            <>
              {/* Galerie d’images */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 320,
                  maxHeight: 500,
                  overflowX: "auto",
                  display: "flex",
                  gap: 2,
                  paddingBottom: 1,
                }}
              >
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  selectedProduct.images.map((imgUrl, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={imgUrl}
                      alt={`${selectedProduct.name} image ${index + 1}`}
                      sx={{
                        height: 180,
                        borderRadius: 2,
                        objectFit: "contain",
                        border: `1px solid ${colors.border}`,
                        bgcolor: colors.background,
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        flexShrink: 0,
                      }}
                    />
                  ))
                ) : (
                  <Typography>Aucune image disponible.</Typography>
                )}
              </Box>

              {/* Infos détaillées */}
              <Box sx={{ flex: 1, minWidth: 320 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: colors.primary }}
                >
                  {selectedProduct.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Catégorie :</strong>{" "}
                  {selectedProduct.category?.name || "N/A"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Prix :</strong> {selectedProduct.price.toFixed(2)} €
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Stock :</strong> {selectedProduct.stock}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, color: colors.lightText }}
                >
                  {selectedProduct.description || "Pas de description disponible."}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ borderTop: `1px solid ${colors.border}` }}>
          <Button
            onClick={closeDetails}
            sx={{
              color: colors.primary,
              borderColor: colors.primary,
              "&:hover": {
                backgroundColor: colors.accentHover,
                color: colors.background,
              },
            }}
            variant="outlined"
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductTable;