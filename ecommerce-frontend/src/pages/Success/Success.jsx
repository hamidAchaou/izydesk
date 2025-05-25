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

const Success = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("latestOrder");
    if (stored) {
      setOrderData(JSON.parse(stored));
    }
  }, []);

  if (!orderData) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <Typography>Chargement de la facture...</Typography>
      </Box>
    );
  }

  const { user, order } = orderData;
  const shippingFee = 5;
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee;
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  // Send sessionId to your backend API
  fetch('http://localhost:8000/api/order/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  })
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      console.log('Order saved successfully');
    } else {
      console.error('Failed to save order', data.error);
    }
  });
  
  return (
    <Box maxWidth="md" mx="auto" p={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          ✅ Facture
        </Typography>

        <Grid container spacing={4} mb={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Client</Typography>
            <Typography><strong>Nom:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Commande</Typography>
            <Typography><strong>ID:</strong> {order.id || "N/A"}</Typography>
            <Typography>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Produit</strong></TableCell>
                <TableCell><strong>Prix Unitaire</strong></TableCell>
                <TableCell><strong>Quantité</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>€{item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    €{(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={4} display="flex" flexDirection="column" alignItems="flex-end">
          <Typography><strong>Sous-total:</strong> €{subtotal.toFixed(2)}</Typography>
          <Typography><strong>Frais de livraison:</strong> €{shippingFee.toFixed(2)}</Typography>
          <Typography variant="h6" mt={1}>
            <strong>Total à payer:</strong> €{total.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Success;
