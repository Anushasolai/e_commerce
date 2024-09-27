import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    createHttpLink as originalCreateHttpLink,
  } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context"; // Correct import
  import { onError } from "@apollo/client/link/error"; // Correct import
  
  
  const mockClient = {
    mutate: jest.fn().mockResolvedValue({ data: { myMutation: { id: '1', name: 'Test' } } }),
    query: jest.fn().mockResolvedValue({ data: { myData: [{ id: '1', name: 'Test' }] } }),
    resetStore: jest.fn(),
  };
  
 
  const createHttpLink = jest.fn().mockReturnValue(originalCreateHttpLink({ uri: "http://localhost:4000/graphql" }));
  const authLink = jest.fn();
  const errorLink = jest.fn();
  
  const ApolloLinkMock = {
    from: jest.fn().mockImplementation((links: ApolloLink[]) => {
      if (!links || links.some(link => link === undefined)) {
        console.error("One of the links is undefined:", links);
        throw new Error("One of the links is undefined");
      }
      return links; 
    }),
  };
  
  export {
    mockClient,
    ApolloClient,
    InMemoryCache,
    createHttpLink, 
    ApolloLinkMock, 
    setContext,
    onError,
    authLink,
    errorLink,
  };
  