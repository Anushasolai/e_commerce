import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterPage from "../components/RegisterPage";
import { MemoryRouter } from "react-router-dom";

test("renders the registration form", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
});
