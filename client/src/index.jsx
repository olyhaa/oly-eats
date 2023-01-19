import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink } from '@apollo/client';
import './index.css';
import App from './App';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://${window.location.hostname}:4000/`,
});

const client = new ApolloClient({
  cache,
  link,
});

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
