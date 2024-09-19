import React, { useState } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { Product } from "./ProductCard";

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

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  onProductAdd: (product: Product) => void;
  role: string;
  token: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onCategoryChange,
  onProductAdd,
  role,
  token,
}) => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    title: "",
    category: "",
    price: 0,
    rating: 0,
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleOpen = () => {
    if (role === "admin") {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage(null);
    setNewProduct({
      title: "",
      category: "",
      price: 0,
      rating: 0,
      image: "",
    });
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    let newValue = value as number | string;
    if (name === "price" || name === "rating") {
      newValue = parseFloat(value);
      if (isNaN(newValue)) {
        newValue = 0;
      }
    }
    setNewProduct({
      ...newProduct,
      [name]: newValue as any,
    });
  };

  const validateProduct = () => {
    if (
      !newProduct.title ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.rating ||
      !newProduct.image
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (
      newProduct.price <= 0 ||
      newProduct.rating < 0 ||
      newProduct.rating > 5
    ) {
      setErrorMessage(
        "Price must be greater than 0 and rating between 0 and 5."
      );
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleAddProduct = async () => {
    if (!validateProduct()) return;

    try {
      const response = await createProduct({
        variables: {
          title: newProduct.title,
          category: newProduct.category,
          price: newProduct.price,
          rating: newProduct.rating,
          image: newProduct.image,
        },
      });

      console.log("Product created:", response.data.createProduct);
      onProductAdd(response.data.createProduct);
      handleClose();
    } catch (error) {
      if (error instanceof ApolloError) {
        error.graphQLErrors.forEach(
          ({ message, locations, path, extensions }) => {
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                locations
              )}, Path: ${path}, Extensions: ${JSON.stringify(extensions)}`
            );
          }
        );

        if (error.networkError) {
          console.error(`[Network error]: ${error.networkError.message}`);
        }

        console.error("Full error object:", error);
        setErrorMessage(error.message || "An unexpected error occurred");
      } else {
        console.error("Unknown error:", error);
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="sidebar">
      <Button onClick={() => onCategoryChange("")}>Home</Button>
      <Button onClick={() => onCategoryChange("beauty")}>Beauty</Button>
      <Button onClick={() => onCategoryChange("fragrances")}>Fragrances</Button>
      <Button onClick={() => onCategoryChange("furniture")}>Furniture</Button>
      <Button onClick={() => onCategoryChange("groceries")}>Groceries</Button>

      {role === "admin" && (
        <>
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{ marginTop: "20px" }}
          >
            Create Product
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-product-title"
          >
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
              <Typography id="add-product-title" variant="h6" gutterBottom>
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
                <Typography color="error" margin="normal">
                  {errorMessage}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleAddProduct}
                style={{ marginTop: "20px" }}
              >
                Add Product
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Sidebar;
