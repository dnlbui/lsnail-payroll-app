import "bootstrap/dist/css/bootstrap.css"
import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {ApiProvider} from '@reduxjs/toolkit/query/react'
import {productsApiSlice} from './features/api/apiSlice'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApiProvider api={productsApiSlice}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Nav />
            <App>
              <Switch>
                <Route>

                </Route>
                <Route>
                  
                </Route>
                <Route>
                
                </Route>
                <Route>
                  
                </Route>
                <Route>
                
                </Route>
              </Switch>
            </App>
          </Fragment>
      </Router>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);


