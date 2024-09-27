import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../components/LoginPage";
import { login } from "../services/authServiceLogin";
import { MemoryRouter } from "react-router-dom";

jest.mock("@apollo/client", () => ({
  ApolloClient: jest.fn().mockImplementation(() => ({
    query: jest.fn(),
    mutate: jest.fn(),
    subscribe: jest.fn(),
  })),
  InMemoryCache: jest.fn(),
  gql: jest.fn(),
  ApolloError: jest.fn(),
}));

jest.mock("../services/authServiceLogin");

describe("LoginPage", () => {
  const setIsLoggedIn = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );
  });

  test("renders login form", () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("displays error message on login failure", async () => {
    (login as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid credentials")
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/login failed: invalid credentials/i)
      ).toBeInTheDocument();
    });
  });
});
