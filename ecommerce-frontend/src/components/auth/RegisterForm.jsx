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
        "Registration failed. Please check your inputs.";
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
            Create an Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
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
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />

            <TextField
              label="Password"
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
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <TextField
              label="Confirm Password"
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
                      aria-label="toggle password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              autoComplete="tel"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9+\-() ]+$/,
                  message: "Invalid phone number",
                },
              })}
            />

            <TextField
              label="Address"
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
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <MuiLink component={Link} to="/login">
                Login
              </MuiLink>
            </Typography>

            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Continue shopping?{" "}
              <MuiLink component={Link} to="/products">
                Browse Products
              </MuiLink>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterForm;
