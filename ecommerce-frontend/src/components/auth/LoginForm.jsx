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
      setError("Invalid email or password.");
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
        {/* ➤ Login Card */}
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
              Login
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
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
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
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don&apos;t have an account?{" "}
                <MuiLink component={Link} to="/register">
                  Register
                </MuiLink>
              </Typography>
              
              {/* Add this new link to products page */}
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Browse our{" "}
                <MuiLink component={Link} to="/products">
                  Products
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