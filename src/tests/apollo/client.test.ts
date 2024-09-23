import client from "../../apollo/client";

import { mockClient, createHttpLink } from "../../apollo/mocks"; // Ensure createHttpLink is imported

jest.mock("../../apollo/mocks", () => ({
  mockClient: jest.fn(), // Ensure mockClient is a mock
  createHttpLink: jest.fn(), // Mock createHttpLink
  authLink: jest.fn(),
  errorLink: jest.fn(),
}));

describe("Apollo Client", () => {
  it("should create an Apollo Client instance", () => {
    expect(mockClient).toBeDefined();
    expect(client).toBeDefined();
  });

});
