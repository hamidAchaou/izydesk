import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link as MuiLink,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const { loginUser } = useAuth();
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    try {
      const { data: responseData } = await login(data);
      loginUser(responseData);
      navigate("/");
    } catch (err) {
      setError("Email ou mot de passe invalide.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box
        display="flex"
        gap={4}
        justifyContent="center"
        alignItems="stretch"
        flexDirection={{ xs: "column", md: "row" }}
      >
        {/* ➤ Carte de connexion */}
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            boxShadow: 3,
            borderRadius: 3,
            bgcolor: "var(--background-color)",
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Connexion
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
              noValidate
            >
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Adresse email invalide",
                  },
                })}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Mot de passe"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Le mot de passe est requis",
                  minLength: { value: 6, message: "Minimum 6 caractères" },
                })}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "var(--accent-color)",
                  "&:hover": {
                    backgroundColor: "var(--accent-hover-color)",
                  },
                  color: "#fff",
                  fontWeight: "bold",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Vous n'avez pas de compte ?{" "}
                <MuiLink component={Link} to="/register">
                  Inscrivez-vous
                </MuiLink>
              </Typography>

              {/* Nouveau lien vers la page produits */}
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Parcourez nos{" "}
                <MuiLink component={Link} to="/products">
                  Produits
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
