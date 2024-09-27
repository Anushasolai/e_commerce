import {
    ApolloClient,
    InMemoryCache,
    ApolloLink as OriginalApolloLink,
  } from "@apollo/client";

  import { createHttpLink, authLink, errorLink, ApolloLinkMock } from "./mocks"; 
  
  const httpLink = createHttpLink();
  
  const client = new ApolloClient({
    link: OriginalApolloLink.from([authLink, errorLink, httpLink]), 
    cache: new InMemoryCache(), 
  });
  
  export default client;
  