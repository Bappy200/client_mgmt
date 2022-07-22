import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import { Client, Header } from './components';
import './App.css'
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
})

function App() {

  return (
    <>
    <ApolloProvider client={client}>
      <h1>hello</h1>
      <Header/>
      <Client/>
      </ApolloProvider>
    </>
  );
}

export default App;
