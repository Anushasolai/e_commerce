import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { Product } from "./components/ProductCard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import './style.css'

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
    if (storedToken) {
      try {
        const decodedToken: any = jwtDecode(storedToken);
        setRole(decodedToken.role);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Fetch products from GraphQL API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const headers: any = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            query: `
              query {
                products(page: ${currentPage}, limit: 10) {
                  products {
                    id
                    title
                    category
                    price
                    rating
                    image
                  }
                  total
                }
              }
            `,
          }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} - ${errorText}`
          );
        }
        const result = await response.json();
        if (result.errors) {
          throw new Error(
            result.errors.map((err: any) => err.message).join(", ")
          );
        }
        if (
          result.data &&
          result.data.products &&
          result.data.products.products
        ) {
          setProducts(result.data.products.products);
          setTotalPages(Math.ceil(result.data.products.total / 10));
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setLoading(false);
    };
    if (token) {
      fetchProducts();
    }
  }, [token, currentPage]);

  const handleCategorySelect = (category: string) =>
    setSelectedCategory(category);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.category === selectedCategory : true) &&
      (searchText
        ? product.title.toLowerCase().includes(searchText.toLowerCase())
        : true)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<RegisterPage />} />
          </>
        ) : (
          <>
            <Route
              path="/dashboard"
              element={
                <>
                  <Navbar
                    setSearchText={setSearchText}
                    setIsLoggedIn={setIsLoggedIn}
                    cartItems={cart.length}
                    onCartClick={handleCartOpen}
                  />
                  {token && (
                    <Sidebar
                      role={role}
                      onCategoryChange={handleCategorySelect}
                      onProductAdd={handleProductAdd}
                      token={token}
                    />
                  )}
                  <main>
                    <ProductList
                      products={filteredProducts}
                      onAddToCart={handleAddToCart}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </main>
                  {/* Cart Dialog */}
                  <Dialog open={cartOpen} onClose={handleCartClose}>
                    <DialogTitle>Cart Items</DialogTitle>
                    <DialogContent>
                      {cart.length > 0 ? (
                        <List>
                          {cart.map((product) => (
                            <ListItem key={product.id}>
                              <ListItemText
                                primary={product.title}
                                secondary={
                                  <Box>
                                    <Typography variant="body2">
                                      Price: {product.price}
                                    </Typography>
                                    <Typography variant="body2">
                                      Category: {product.category}
                                    </Typography>
                                    <Typography variant="body2">
                                      Rating: {product.rating}
                                    </Typography>
                                  </Box>
                                }
                              />
                              <img
                                src={product.image}
                                alt={product.title}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginLeft: "10px",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body1">Cart is empty</Typography>
                      )}
                    </DialogContent>
                  </Dialog>
                </>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
