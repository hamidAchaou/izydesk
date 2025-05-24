import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CategoryTable from "../../../../components/Admin/Categories/CategoryTable";
import CategoryFormDialog from "../../../../components/Admin/Categories/CategoryFormDialog";
import ConfirmDialog from "../../../../components/Products/ConfirmDialog";
import "./CategoriesDashboard.css";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../../api/index";

const CategoriesDashboard = () => {
  const [state, setState] = useState({
    categories: [],
    loading: true,
    error: null,
    success: null,
    selectedCategory: null,
    formOpen: false,
    deleteDialogOpen: false,
    categoryToDelete: null,
  });

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await getCategories();
      setState((prev) => ({
        ...prev,
        categories: response.data,
        loading: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Échec du chargement des catégories.",
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setState((prev) => ({
      ...prev,
      selectedCategory: null,
      formOpen: true,
      error: null,
      success: null,
    }));
  };

  const handleEditClick = (category) => {
    setState((prev) => ({
      ...prev,
      selectedCategory: category,
      formOpen: true,
      error: null,
      success: null,
    }));
  };

  const handleFormClose = () => {
    setState((prev) => ({ ...prev, formOpen: false }));
  };

  const handleFormSubmit = async (categoryData) => {
    try {
      let response;
      if (state.selectedCategory) {
        response = await updateCategory(
          state.selectedCategory.id,
          categoryData
        );
        setState((prev) => ({
          ...prev,
          categories: prev.categories.map((c) =>
            c.id === state.selectedCategory.id ? response.data : c
          ),
          success: "Catégorie mise à jour avec succès !",
          error: null,
          formOpen: false,
        }));
      } else {
        response = await createCategory(categoryData);
        setState((prev) => ({
          ...prev,
          categories: [...prev.categories, response.data],
          success: "Catégorie créée avec succès !",
          error: null,
          formOpen: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: "Échec de l'enregistrement de la catégorie. Veuillez réessayer.",
        success: null,
      }));
    }
  };

  const handleDeleteClick = (category) => {
    setState((prev) => ({
      ...prev,
      categoryToDelete: category,
      deleteDialogOpen: true,
      error: null,
      success: null,
    }));
  };

  const handleDeleteConfirm = async () => {
    if (!state.categoryToDelete) return;
    try {
      await deleteCategory(state.categoryToDelete.id);
      setState((prev) => ({
        ...prev,
        categories: prev.categories.filter(
          (c) => c.id !== state.categoryToDelete.id
        ),
        deleteDialogOpen: false,
        categoryToDelete: null,
        success: "Catégorie supprimée avec succès !",
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: "Échec de la suppression de la catégorie. Veuillez réessayer.",
        success: null,
      }));
    }
  };

  const handleDeleteCancel = () => {
    setState((prev) => ({
      ...prev,
      deleteDialogOpen: false,
      categoryToDelete: null,
    }));
  };

  const handleCloseSnackbar = () => {
    setState((prev) => ({
      ...prev,
      error: null,
      success: null,
    }));
  };

  if (state.loading) {
    return (
      <Box sx={{ mt: 8, textAlign: "center", color: "var(--text-color)" }}>
        <CircularProgress sx={{ color: "var(--accent-color)" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, color: "var(--primary-color)" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: "var(--primary-color)" }}
        >
          Gestion des catégories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
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
          Ajouter une nouvelle catégorie
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

      <CategoryTable
        categories={state.categories}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <CategoryFormDialog
        open={state.formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        category={state.selectedCategory}
      />

      <ConfirmDialog
        open={state.deleteDialogOpen}
        title="Confirmer la suppression"
        content={`Êtes-vous sûr de vouloir supprimer la catégorie "${state.categoryToDelete?.name}" ?`}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default CategoriesDashboard;
