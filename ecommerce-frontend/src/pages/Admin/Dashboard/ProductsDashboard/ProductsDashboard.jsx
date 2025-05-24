// src/pages/Admin/Dashboard/ProductsDashboard/ProductsDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Container,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import ProductTable from "../../../../components/Products/ProductTable";
import ProductFormDialog from "../../../../components/Products/ProductFormDialog";
import ConfirmDialog from "../../../../components/Products/ConfirmDialog";
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../../api/index";

const ProductsDashboard = () => {
  const [state, setState] = useState({
    products: [],
    categories: [],
    loading: true,
    error: null,
    success: null,
    selectedProduct: null,
    formOpen: false,
    deleteDialogOpen: false,
    productToDelete: null,
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setState((prev) => ({
        ...prev,
        products: productsRes.data,
        categories: categoriesRes.data,
        loading: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || "Échec du chargement des données.",
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setState((prev) => ({ ...prev, selectedProduct: null, formOpen: true }));
  };

  const handleEdit = (product) => {
    setState((prev) => ({ ...prev, selectedProduct: product, formOpen: true }));
  };

  const handleSubmit = async (productData) => {
    try {
      let response;
      if (state.selectedProduct) {
        response = await updateProduct(state.selectedProduct.id, productData);
        setState((prev) => ({
          ...prev,
          products: prev.products.map((p) =>
            p.id === state.selectedProduct.id ? response.data : p
          ),
          success: "Produit mis à jour avec succès !",
        }));
      } else {
        response = await createProduct(productData);
        setState((prev) => ({
          ...prev,
          products: [...prev.products, response.data],
          success: "Produit créé avec succès !",
        }));
      }
      setState((prev) => ({ ...prev, formOpen: false }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err.response?.data?.message || "Échec de l'enregistrement du produit.",
      }));
    }
  };

  const handleDelete = (product) => {
    setState((prev) => ({
      ...prev,
      productToDelete: product,
      deleteDialogOpen: true,
    }));
  };

  const confirmDelete = async () => {
    if (!state.productToDelete) return;
    try {
      await deleteProduct(state.productToDelete.id);
      setState((prev) => ({
        ...prev,
        products: prev.products.filter(
          (p) => p.id !== state.productToDelete.id
        ),
        deleteDialogOpen: false,
        success: "Produit supprimé avec succès !",
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err.response?.data?.message || "Échec de la suppression du produit.",
      }));
    }
  };

  const handleCloseSnackbar = () => {
    setState((prev) => ({ ...prev, error: null, success: null }));
  };

  if (state.loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color: colors.primary }}>
          Gestion des produits
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "var(--accent-color)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "var(--accent-hover-color)",
            },
            transition: "var(--transition-speed)",
            borderRadius: "var(--border-radius)",
            boxShadow: "var(--box-shadow)",
          }}
        >
          Ajouter un produit
        </Button>
      </Box>

      {state.error && (
        <Snackbar
          open={!!state.error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error" onClose={handleCloseSnackbar}>
            {state.error}
          </Alert>
        </Snackbar>
      )}

      {state.success && (
        <Snackbar
          open={!!state.success}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            {state.success}
          </Alert>
        </Snackbar>
      )}

      <ProductTable
        products={state.products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductFormDialog
        open={state.formOpen}
        onClose={() => setState((prev) => ({ ...prev, formOpen: false }))}
        onSubmit={handleSubmit}
        product={state.selectedProduct}
        categories={state.categories}
      />

      <ConfirmDialog
        open={state.deleteDialogOpen}
        title="Confirmer la suppression"
        content={`Êtes-vous sûr de vouloir supprimer "${state.productToDelete?.name}" ?`}
        onCancel={() =>
          setState((prev) => ({ ...prev, deleteDialogOpen: false }))
        }
        onConfirm={confirmDelete}
      />
    </Container>
  );
};

export default ProductsDashboard;
