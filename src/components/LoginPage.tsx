import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/authServiceLogin";

interface DecodedToken {
  role: string;
}

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      localStorage.setItem("accessToken", token);

      const decodedToken = jwtDecode<DecodedToken>(token);
      const role = decodedToken.role;

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError(`Login failed: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        marginLeft: "650px",
      }}
    >
      <Container maxWidth="xs">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;
