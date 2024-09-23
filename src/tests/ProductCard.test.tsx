import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard"; 

const mockProduct = {
  id: 2,
  image: "sample-image.jpg",
  title: "Sample Product Title",
  price: 10.99,
  category: "Electronics",
  rating: 4.5,
};

const mockOnAddToCart = jest.fn();

describe("ProductCard Component", () => {
  beforeEach(() => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
  });

  test("renders ProductCard with product details", () => {
    const categories = screen.getAllByText(`Category: ${mockProduct.category}`);
    expect(categories.length).toBe(1);
  
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Sample Product Title/i })).toHaveAttribute("src", mockProduct.image);
  });

  test("handles rating change", () => {
    const ratingInput = screen.getByRole('radio', { name: /5 stars/i });
    fireEvent.change(ratingInput, { target: { checked: true } });
  
    screen.debug();
    expect(screen.getByText((content, element) => 
      element !== null && content.startsWith('5') && element.tagName.toLowerCase() === 'span')).toBeInTheDocument();
    
 
});

  
  test("calls onAddToCart when 'Add to Cart' button is clicked", () => {
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct); 
  });
});
