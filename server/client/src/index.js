import "bootstrap/dist/css/bootstrap.css"
import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {ApiProvider} from '@reduxjs/toolkit/query/react'

import {apiSlice} from './app/api/apiSlice'
import Nav from "./components/Nav";


import { BrowserRouter, Routes, Route } from 'react-router-dom'



const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);


