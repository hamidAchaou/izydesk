import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Chip,
  Button,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocalShipping,
  Replay,
} from "@mui/icons-material";

const statusColors = {
  delivered: "var(--success-color, #4caf50)", // green for delivered
  shipped: "var(--accent-hover-color, #0056b3)", // blue hover accent for shipped
  processing: "var(--secondary-color, #555555)", // medium gray
  cancelled: "var(--error-color, #ff4d4f)", // red for cancelled
  pending: "var(--warning-color, #fbc02d)", // yellow for pending
};

const OrderRow = ({ order, onAction }) => {
  const [open, setOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return <LocalShipping sx={{ color: statusColors["shipped"] }} />;
      case "delivered":
        return <Replay sx={{ color: statusColors["delivered"] }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ color: "var(--accent-color)" }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
        <TableCell>
          <Chip
            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} // capitalize label
            icon={getStatusIcon(order.status)}
            variant="outlined"
            sx={{
              borderColor: statusColors[order.status.toLowerCase()],
              color: statusColors[order.status.toLowerCase()],
              backgroundColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </TableCell>
        <TableCell>
          ${typeof order.total === "number" ? order.total.toFixed(2) : "0.00"}
        </TableCell>
        <TableCell>
          {order.status.toLowerCase() === "pending" && (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => onAction(order, "shipped")}
                sx={{
                  mr: 1,
                  backgroundColor: "var(--accent-color)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "var(--accent-hover-color)",
                  },
                }}
              >
                Mark as Shipped
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onAction(order, "cancelled")}
              >
                Cancel Order
              </Button>
            </>
          )}
          {order.status.toLowerCase() === "shipped" && (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => onAction(order, "delivered")}
            >
              Mark as Delivered
            </Button>
          )}
          {order.status.toLowerCase() === "delivered" && (
            <Button
              variant="outlined"
              size="small"
              disabled
              sx={{
                backgroundColor: "var(--success-color, #4caf50)",
                color: "#fff",
                "&.Mui-disabled": {
                  backgroundColor: "var(--success-color, #4caf50)",
                  color: "#fff",
                },
              }}
            >
              Delivered
            </Button>
          )}

          {order.status.toLowerCase() === "cancelled" && (
            <Button
              variant="outlined"
              size="small"
              disabled
              sx={{
                backgroundColor: "#ff4d4f",
                color: "#fff",
                "&.Mui-disabled": {
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                },
              }}
            >
              Cancelled
            </Button>
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open} unmountOnExit>
            <Box
              sx={{
                margin: 2,
                backgroundColor: "var(--background-color)",
                border: "1px solid var(--border-color)",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "var(--primary-color)" }}
              >
                Items
              </Typography>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "var(--secondary-color)" }}>
                  <TableRow>
                    <TableCell sx={{ color: "var(--accent-color)" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ color: "var(--accent-color)" }}>
                      Quantity
                    </TableCell>
                    <TableCell sx={{ color: "var(--accent-color)" }}>
                      Price
                    </TableCell>
                    <TableCell sx={{ color: "var(--accent-color)" }}>
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        $
                        {typeof item.price === "number"
                          ? item.price.toFixed(2)
                          : "0.00"}
                      </TableCell>
                      <TableCell>
                        $
                        {typeof item.price === "number" &&
                        typeof item.quantity === "number"
                          ? (item.price * item.quantity).toFixed(2)
                          : "0.00"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
