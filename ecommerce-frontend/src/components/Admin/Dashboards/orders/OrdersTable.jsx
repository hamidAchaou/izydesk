import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
} from "@mui/material";
import OrderRow from "./OrderRow";

const OrdersTable = ({
  orders,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onAction,
}) => {
  const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={0} sx={{ border: "1px solid var(--border-color)", bgcolor: "var(--background-color)" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--primary-color)" }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ color: "var(--background-color)" }}>ID de commande</TableCell>
              <TableCell sx={{ color: "var(--background-color)" }}>Date</TableCell>
              <TableCell sx={{ color: "var(--background-color)" }}>Statut</TableCell>
              <TableCell sx={{ color: "var(--background-color)" }}>Total</TableCell>
              <TableCell sx={{ color: "var(--background-color)" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <OrderRow key={order.id} order={order} onAction={onAction} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          bgcolor: "var(--background-color)",
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
            color: "var(--primary-color)",
          },
          ".MuiSvgIcon-root": {
            color: "var(--accent-color)",
          },
        }}
      />
    </Paper>
  );
};

export default OrdersTable;
