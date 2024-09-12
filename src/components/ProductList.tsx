import React from "react";
import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {products.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          width="100%"
          gap={3}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
          width="100%"
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: "1.5em",
              color: "#ff0000",
              padding: "20px",
              border: "2px solid white",
              borderRadius: "10px",
              backgroundColor: "#eee",
              fontWeight: "bolder",
              opacity: 0.8,
              marginLeft: 80,
            }}
          >
            Products Not Found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
