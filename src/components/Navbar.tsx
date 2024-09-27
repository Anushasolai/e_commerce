import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface NavbarProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  setSearchText,
  setIsLoggedIn,
  cartItems,
  onCartClick,
}) => {
  const [localSearchText, setLocalSearchText] = useState<string>("");
  const navigate = useNavigate();

  const handleClearSearch = () => {
    setLocalSearchText("");
    setSearchText("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchText(value);
    setSearchText(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            <ShoppingCartIcon /> My Shop
          </Typography>
          <TextField
            variant="filled"
            size="small"
            placeholder="Search products..."
            value={localSearchText}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
            InputProps={{
              endAdornment: localSearchText ? (
                <IconButton
                  edge="end"
                  aria-label="clear"
                  onClick={handleClearSearch}
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                <IconButton edge="end" aria-label="search">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <IconButton
            color="inherit"
            onClick={onCartClick}
            aria-label="open cart"
          >
            <Badge badgeContent={cartItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: "64px" }}></div>
    </>
  );
};

export default Navbar;
