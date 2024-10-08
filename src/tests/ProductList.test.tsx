import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { Product } from "../components/ProductCard";

const products: Product[] = [
  {
    id: 1,
    title: "Product 1",
    category: "category",
    price: 10.99,
    rating: 4.5,
    image: "product1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    category: "category",
    price: 20.99,
    rating: 4.0,
    image: "product2.jpg",
  },
];

const mockOnAddToCart = jest.fn();
const mockOnPageChange = jest.fn();

test("renders ProductList component and displays products", () => {
  render(
    <ProductList
      products={products}
      onAddToCart={mockOnAddToCart}
      currentPage={1}
      totalPages={2}
      onPageChange={mockOnPageChange}
    />
  );

  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
});
