import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { useCart } from "../../context/CartContext";

const Success = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const { clearCart, cartItems } = useCart();  // Ajout de cartItems ici

  const token = localStorage.getItem("token");
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    // Si pas de token, sessionId ou panier vide, on ne fait rien
    if (!token || !sessionId) {
      console.error("Token ou sessionId manquant.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      console.error("Le panier est vide.");
      return;
    }

    const confirmOrder = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sessionId,
            items: cartItems.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrderData(data);
        clearCart();
      } catch (error) {
        console.error("Erreur d’enregistrement de la commande:", error.message);
      }
    };

    confirmOrder();
  }, [token, sessionId, cartItems, clearCart]);

  if (!orderData) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <Typography>Chargement de la facture...</Typography>
      </Box>
    );
  }
console.log(items);

  const { user, order } = orderData;
  const shippingFee = 5;
  const subtotal =
    order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const total = subtotal + shippingFee;

  return (
    <Box maxWidth="md" mx="auto" p={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          ✅ Facture
        </Typography>

        {/* Informations client et commande */}
        <Grid container spacing={4} mb={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Client</Typography>
            <Typography>
              <strong>Nom:</strong> {user?.name || "N/A"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user?.email || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Commande</Typography>
            <Typography>
              <strong>ID:</strong> {order?.id || "N/A"}
            </Typography>
            <Typography>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Détail des articles */}
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Produit</strong>
                </TableCell>
                <TableCell>
                  <strong>Prix Unitaire</strong>
                </TableCell>
                <TableCell>
                  <strong>Quantité</strong>
                </TableCell>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>€{item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>€{(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totaux */}
        <Box mt={4} display="flex" flexDirection="column" alignItems="flex-end">
          <Typography>
            <strong>Sous-total:</strong> €{subtotal.toFixed(2)}
          </Typography>
          <Typography>
            <strong>Frais de livraison:</strong> €{shippingFee.toFixed(2)}
          </Typography>
          <Typography variant="h6" mt={1}>
            <strong>Total à payer:</strong> €{total.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Success;
