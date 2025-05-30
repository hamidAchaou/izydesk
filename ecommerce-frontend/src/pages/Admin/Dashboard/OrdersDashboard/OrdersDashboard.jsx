import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import OrdersTable from "../../../../components/Admin/Dashboards/orders/OrdersTable";
import { getOrders, updateOrder } from "../../../../api/orders";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setError("Échec du chargement des commandes"))
      .finally(() => setLoading(false));
  }, []);
  
  
  const handleAction = async (order, newStatus) => {
    try {
      const updatedOrder = { ...order, status: newStatus };
  
      await updateOrder(order.id, updatedOrder);
  
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
      );
    } catch (error) {
      console.error("Échec de la mise à jour du statut de la commande :", error);
      alert("Échec de la mise à jour du statut de la commande.");
    }
  };  

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 10, color: "red" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "var(--primary-color)", mb: 2 }}>
        Mes commandes
      </Typography>
      {orders.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          Aucune commande trouvée.
        </Typography>
      ) : (
        <OrdersTable
          orders={orders}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          onAction={handleAction}
        />
      )}
    </Box>
  );
};

export default OrdersDashboard;