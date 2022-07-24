import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import './App.css'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import { Header, ProjectDetails } from './components';
import { Home, NotFound } from './pages';
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
      <Router>
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/project/:id' element={<ProjectDetails/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
