// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import './Dashboard.css';
import {
  Typography,
  Container,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ProductTable from "../../../components/Products/ProductTable";
import ProductFormDialog from "../../../components/Products/ProductFormDialog";
import ConfirmDialog from "../../../components/Products/ConfirmDialog";

import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../api/index";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddClick = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (selectedProduct) {
        const response = await updateProduct(selectedProduct.id, productData);
        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? response.data : p))
        );
      } else {
        const response = await createProduct(productData);
        setProducts((prev) => [...prev, response.data]);
      }
      setFormOpen(false);
      setError("");
    } catch (err) {
      setError("Failed to save product. Please try again.");
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) =>
        prev.filter((product) => product.id !== productToDelete.id)
      );
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch {
      setError("Failed to delete product.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Product Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Product
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}

      <ProductFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        product={selectedProduct}
        categories={categories}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        content={`Are you sure you want to delete "${productToDelete?.name}"?`}
      />
    </Container>
  );
};

export default Dashboard;