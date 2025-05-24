import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({ open, title, content, onCancel, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Annuler</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
