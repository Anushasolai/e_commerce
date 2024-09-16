import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    <>
      <Card
        sx={{
          width: "250px",
          height: "350px",
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
          height="200"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {product.price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
            <Rating
              value={currentRating}
              precision={1}
              onChange={handleRatingChange}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {currentRating}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
