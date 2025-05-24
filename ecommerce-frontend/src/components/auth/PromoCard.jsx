import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const PromoCard = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        minHeight: 450,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      {/* Image de fond */}
      <CardMedia
        component="img"
        image="/assets/images/baner-right-image-02.jpg" // ✅ Utilisez votre image
        alt="Bannière Promo"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
          zIndex: 0,
          filter: "brightness(0.55)",
        }}
      />

      {/* Texte en superposition */}
      <CardContent
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 480,
          color: "#fff",
          px: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            fontSize: { xs: "2rem", md: "2.75rem" },
          }}
        >
          Un style qui inspire
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontSize: "1rem",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            lineHeight: 1.6,
          }}
        >
          Découvrez nos dernières tendances mode et lifestyle. Sélectionnées pour les tendances modernes. Cliquez ci-dessous et rehaussez votre style dès aujourd’hui.
        </Typography>

        <Box>
          <Button
            variant="contained"
            component={Link}
            to="/products"
            size="large"
            sx={{
              backgroundColor: "#fff",
              color: "#111",
              fontWeight: "bold",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f4f4f4",
              },
            }}
          >
            Visiter la boutique
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PromoCard;
