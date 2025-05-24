import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Alert,
  Card,
  CardContent,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterForm = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const getRedirectPath = () => location.state?.from?.pathname || "/products";

  const onSubmit = async (formData) => {
    setError("");

    const { name, email, password, phone, address } = formData;
    const [firstName, ...lastNameParts] = name.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    const payload = {
      firstName,
      lastName,
      email,
      password,
      phone: phone || "",
      address: address || "",
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        payload
      );

      loginUser(response.data);
      navigate(getRedirectPath(), { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "L'inscription a échoué. Veuillez vérifier vos informations.";
      setError(message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "var(--background-color)",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Créer un compte
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Nom complet"
              fullWidth
              margin="normal"
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name", {
                required: "Le nom complet est obligatoire",
                minLength: {
                  value: 3,
                  message: "Au moins 3 caractères",
                },
              })}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: "L'email est obligatoire",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Adresse email invalide",
                },
              })}
            />

            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Afficher ou masquer le mot de passe"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", {
                required: "Le mot de passe est obligatoire",
                minLength: {
                  value: 6,
                  message: "Au moins 6 caractères",
                },
              })}
            />

            <TextField
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              autoComplete="new-password"
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Afficher ou masquer la confirmation du mot de passe"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password_confirmation", {
                required: "Veuillez confirmer votre mot de passe",
                validate: (value) =>
                  value === password || "Les mots de passe ne correspondent pas",
              })}
            />

            <TextField
              label="Téléphone"
              fullWidth
              margin="normal"
              autoComplete="tel"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register("phone", {
                required: "Le téléphone est obligatoire",
                pattern: {
                  value: /^[0-9+\-() ]+$/,
                  message: "Numéro de téléphone invalide",
                },
              })}
            />

            <TextField
              label="Adresse"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register("address")}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "var(--accent-color)",
                "&:hover": {
                  backgroundColor: "var(--accent-hover-color)",
                },
                color: "#fff",
                fontWeight: "bold",
                py: 1.5,
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Vous avez déjà un compte ?{" "}
              <MuiLink component={Link} to="/login">
                Connectez-vous
              </MuiLink>
            </Typography>

            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Continuer vos achats ?{" "}
              <MuiLink component={Link} to="/products">
                Parcourir les produits
              </MuiLink>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterForm;
