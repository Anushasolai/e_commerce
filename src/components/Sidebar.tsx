import React, { useState } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $category: String!
    $price: Float!
    $rating: Float!
    $image: String!
  ) {
    createProduct(
      title: $title
      category: $category
      price: $price
      rating: $rating
      image: $image
    ) {
      id
      title
      category
      price
      rating
      image
    }
  }
`;


interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  onProductAdd: (product: Product) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onCategoryChange,
  onProductAdd,
}) => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    category: "",
    price: 0,
    rating: 0,
    image: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "price" || name === "rating" ? parseFloat(value) : value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const { data } = await createProduct({
        variables: {
          title: newProduct.title,
          category: newProduct.category,
          price: newProduct.price,
          rating: newProduct.rating,
          image: newProduct.image,
        },
      });

      onProductAdd(data.createProduct);
      handleClose();
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMessage(
        "Failed to store product in the backend. Please try again."
      );
    }
  };

  return (
    <div className="sidebar">
      <Button onClick={() => onCategoryChange("")}>Home</Button>
      <Button onClick={() => onCategoryChange("beauty")}>Beauty</Button>
      <Button onClick={() => onCategoryChange("fragrances")}>Fragrances</Button>
      <Button onClick={() => onCategoryChange("furniture")}>Furniture</Button>
      <Button onClick={() => onCategoryChange("groceries")}>Groceries</Button>

      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ marginTop: "20px" }}
      >
        Create Product
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Product
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Rating"
            name="rating"
            value={newProduct.rating}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            style={{ marginTop: "20px" }}
          >
            Add Product
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Sidebar;
