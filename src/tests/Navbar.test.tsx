import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/Navbar";

test("renders Navbar component", () => {
  const setSearchText = jest.fn();
  render(<Navbar setSearchText={setSearchText} />);

  expect(screen.getByText(/My Shop/i)).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText(/Search products.../i)
  ).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/Search products.../i), {
    target: { value: "Test" },
  });
  expect(setSearchText).toHaveBeenCalledWith("Test");
});
