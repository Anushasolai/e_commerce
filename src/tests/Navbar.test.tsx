import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Navbar Component", () => {
  const setSearchText = jest.fn();
  const setIsLoggedIn = jest.fn();
  const mockOnCartClick = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar
          setSearchText={setSearchText}
          setIsLoggedIn={setIsLoggedIn}
          cartItems={5}
          onCartClick={mockOnCartClick}
        />
      </MemoryRouter>
    );
  });

  test("renders Navbar with initial elements", () => {
    expect(screen.getByText(/My Shop/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search products.../i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/open cart/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  test("calls setSearchText when typing in the search input", () => {
    const searchInput = screen.getByPlaceholderText(/Search products.../i);

    fireEvent.change(searchInput, { target: { value: "Test" } });
    expect(setSearchText).toHaveBeenCalledWith("Test");
    expect(searchInput).toHaveValue("Test");
  });

  test("clears search text when clear icon is clicked", () => {
    const searchInput = screen.getByPlaceholderText(/Search products.../i);
    fireEvent.change(searchInput, { target: { value: "Clear this text" } });

    const clearButton = screen.getByLabelText(/clear/i);
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(setSearchText).toHaveBeenCalledWith("");
  });

  test("calls onCartClick when cart icon is clicked", () => {
    const cartButton = screen.getByLabelText(/open cart/i);
    fireEvent.click(cartButton);
    expect(mockOnCartClick).toHaveBeenCalledTimes(1);
  });

  test("displays correct cart items count", () => {
    const badge = screen.getByText("5");
    expect(badge).toBeInTheDocument();
  });

  test("logs out when logout button is clicked", () => {
    const logoutButton = screen.getByRole("button", { name: /logout/i });

    fireEvent.click(logoutButton);
    expect(setIsLoggedIn).toHaveBeenCalledWith(false);
    expect(localStorage.getItem("accessToken")).toBeNull();
  });
});
