

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [currentRating, setCurrentRating] = useState<number>(product.rating);

  const handleRatingChange = (
    _event: React.ChangeEvent<{}>,
    newRating: number | null
  ) => {
    if (newRating !== null) {
      setCurrentRating(newRating);
    }
  };

  return (
    <Card
      sx={{
        width: 300,
        marginBottom: 2,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title || "Product image"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${product.price}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <Rating
            name="product-rating"
            value={currentRating}
            onChange={handleRatingChange}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {currentRating}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          startIcon={<ShoppingCartIcon />}
          onClick={() => onAddToCart(product)} 
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
