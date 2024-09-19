import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  currentPage,
  totalPages,
  onPageChange,
}) => {
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
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
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
              marginLeft: 75,
            }}
          >
            Products Not Found
          </Typography>
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={2}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="body1" mx={2}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProductList;
