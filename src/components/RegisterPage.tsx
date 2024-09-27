import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import { registerUser } from "../services/authServiceRegister";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(name, password, role);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
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
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default RegisterPage;
