import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Sidebar, { CREATE_PRODUCT } from "../components/Sidebar";

const mocks = [
  {
    request: {
      query: CREATE_PRODUCT,
      variables: {
        title: "Sample Product",
        category: "beauty",
        price: 99.99,
        rating: 4.5,
        image: "http://example.com/image.jpg",
      },
    },
    result: {
      data: {
        createProduct: {
          id: 1,
          title: "Sample Product",
          category: "beauty",
          price: 99.99,
          rating: 4.5,
          image: "http://example.com/image.jpg",
        },
      },
    },
  },
];

test("renders Sidebar and creates product", async () => {
  const mockOnProductAdd = jest.fn();

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Sidebar onCategoryChange={() => {}} onProductAdd={mockOnProductAdd} />
    </MockedProvider>
  );

  fireEvent.click(screen.getByText(/Create Product/i));

  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: "Sample Product" },
  });
  fireEvent.change(screen.getByLabelText(/Category/i), {
    target: { value: "beauty" },
  });
  fireEvent.change(screen.getByLabelText(/Price/i), {
    target: { value: 99.99 },
  });
  fireEvent.change(screen.getByLabelText(/Rating/i), {
    target: { value: 4.5 },
  });
  fireEvent.change(screen.getByLabelText(/Image URL/i), {
    target: { value: "http://example.com/image.jpg" },
  });

  fireEvent.click(screen.getByText(/Add Product/i));

  await waitFor(() => {
    expect(mockOnProductAdd).toHaveBeenCalledWith({
      id: 1,
      title: "Sample Product",
      category: "beauty",
      price: 99.99,
      rating: 4.5,
      image: "http://example.com/image.jpg",
    });
  });
});
