import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import App from './App';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: `http://${window.location.hostname}:4000/`,
});

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
