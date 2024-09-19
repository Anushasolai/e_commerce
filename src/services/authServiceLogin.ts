import { gql, ApolloClient, InMemoryCache, ApolloError } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const LOGIN_MUTATION = gql`
  mutation LoginUser($name: String!, $password: String!) {
    loginUser(name: $name, password: $password) {
      token
    }
  }
`;

export const login = async (
  name: string,
  password: string
): Promise<string> => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { name, password },
    });

    if (data && data.loginUser && data.loginUser.token) {
      return data.loginUser.token;
    } else {
      throw new Error("Login failed: No token received");
    }
  } catch (error: unknown) {
    if (error instanceof ApolloError) {
      console.error("GraphQL Errors:", error.graphQLErrors);
      console.error("Network Error:", error.networkError);

      const errorMessage = error.networkError
        ? `Network error: ${error.networkError.message}`
        : `GraphQL error: ${error.graphQLErrors
            .map((err) => err.message)
            .join(", ")}`;

      throw new Error(errorMessage);
    }

    if (error instanceof Error) {
      console.error("Unknown error:", error.message);
      throw new Error(`Unknown error: ${error.message}`);
    }

    throw new Error("An unknown error occurred");
  }
};
