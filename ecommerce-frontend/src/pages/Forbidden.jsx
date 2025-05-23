import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Forbidden = () => {
  return (
    <Box
      role="alert"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ color: "var(--primary-color)" }}>
        403
      </Typography>
      <Typography variant="h5" gutterBottom>
        Accès interdit
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "var(--light-text-color)" }}>
        Vous n’avez pas la permission d’accéder à cette page.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          backgroundColor: "var(--accent-color)",
          "&:hover": {
            backgroundColor: "var(--accent-hover-color)",
          },
          paddingX: 4,
          paddingY: 1.5,
          fontWeight: "bold",
        }}
        aria-label="Retour à la page d’accueil"
      >
        Retour à l’accueil
      </Button>
    </Box>
  );
};

export default Forbidden;
