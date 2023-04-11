import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'fileicon.css/fileicon.css';
import { makeStore } from './store/make';

const store = makeStore();

createRoot(document.getElementById('root')!).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
);
