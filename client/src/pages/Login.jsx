import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { TextField, Button, Container, Typography, Link, Alert, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Google login callback
  const handleGoogleCallback = async () => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token && name && email) {
      try {
        // Dispatch user and token to Redux
        dispatch(loginSuccess({ token, user: { name, email } }));
        navigate("/dashboard");
      } catch (err) {
        console.error("Error handling Google login callback:", err);
        setError("Failed to log in with Google. Please try again.");
      }
    } else {
      setError("Missing authentication details from Google. Please try again.");
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to Google login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  // Automatically handle Google callback if query params are present
  useEffect(() => {
    if (location.search) {
      handleGoogleCallback();
    }
  }, [location.search]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <Typography variant="h2" color="orange" fontFamily={"sacremento"}>Blog</Typography>
        <Typography variant="h4">Login</Typography>
      </Box>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleGoogleLogin}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        Login with Google
      </Button>
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Don't have an account?{" "}
        <Link href="/signup" color="primary">
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;



