import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import App from "../App";

const mocks: readonly MockedResponse<any, any>[] | undefined = [];

const renderWithProviders = (ui: JSX.Element) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>
  );
};

test("renders App component and fetches products", async () => {
  renderWithProviders(<App />);
});
