import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import React from "react";

interface NavbarProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchText }) => {
  const [localSearchText, setLocalSearchText] = useState<string>("");

  const handleClearSearch = () => {
    setLocalSearchText("");
    setSearchText("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchText(value);
    setSearchText(value);
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
            slotProps={{
              input: {
                endAdornment: (
                  <>
                    {localSearchText ? (
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
                    )}
                  </>
                ),
              },
            }}
          />
        </Toolbar>
      </AppBar>
      <div style={{ height: "64px" }}></div>
    </>
  );
};

export default Navbar;
