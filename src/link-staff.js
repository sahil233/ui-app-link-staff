/**
 *  Import node modules
 */
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import { httpHandleError } from './utils/helper';

/**
 *  Prepare the redux store
 */
import reducers from './reducers'

import UserLayout from "./layouts/User.jsx";
import AuthLayout from "./layouts/Auth.jsx";


/**
 *  Implement interceptor for handle global error handling
 */
const middlewareConfig = {
  interceptors: {
    request: [
      {
        success: function({ getState, dispatch, getSourceAction }, req) {
          return req
        }
      }
    ],
    response: [
      {
        success: function({ getState, dispatch, getSourceAction }, response) {
          return response
        },
        error: function({ getState, dispatch, getSourceAction }, error) {
          httpHandleError(error);
          return Promise.reject(error)
        }
      }
    ]
  }
}

const linkStaffClient = axios.create({
  // baseURL:'http://localhost:8080/api',
  responseType: 'json'
});

const createStoreWithMiddleware = applyMiddleware(
  axiosMiddleware(linkStaffClient, middlewareConfig),
  thunk
)(createStore)
const store = createStoreWithMiddleware(
  reducers,
  undefined,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({
          name: 'LinkStaff'
        })
      : f => f
  )
)

const LinkStaff = props => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} />} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default LinkStaff
