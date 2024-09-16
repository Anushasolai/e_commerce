import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";


const mockProduct = {
  id: 2,
  name: "Sample Product",
  price: 10.99,
  imageUrl: "sample.jpg",
  rating: 4.5,
  image: "sample-image.jpg",
  title: "Sample Product Title",
  category: "Electronics",
};

test("renders ProductCard component and handles rating change", () => {
  render(<ProductCard product={mockProduct} />);

  const ratingInput = screen.getByLabelText("5 Stars");
  fireEvent.click(ratingInput);

  expect(screen.getByLabelText("5 Stars")).toBeChecked();
});
