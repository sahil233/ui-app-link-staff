/**
 *  Import action creator constants & dependencies
 */
import {
  LOGIN_USER,
  REGISTER_USER,
  LIST_EDUCATION_INSTITUTE,
  CANCEL_ALL_API_REQUESTS,
} from './constants';
import { API_URLS } from '../../configs/urls';
import axios from 'axios';
import qs from 'qs/lib/index';
const cancelApiRequests = [];

/**
 *  Login Users
 */
export function login(email, password) {
  return async (dispatch, getState) => {
    var params = {
      email,
      password,
    };
    const source = axios.CancelToken.source();
    cancelApiRequests.push(source);
    try {
      const response = await dispatch(
        loginBegin(
          API_URLS.AUTH.LOGIN,
          params,
          source
        )
      );
      if (response.payload) {
        const { data } = response.payload;
        return data;
      }

      throw response;
    } catch (error) {
      throw error.response;
    }
  };
}

export const loginBegin = (API_URL, params, source) => ({
  type: LOGIN_USER,
  payload: {
    request: {
      url: API_URL,
      method: 'post',
      data: JSON.stringify(params),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      cancelToken: source.token
    }
  }
});

/**
 *  Get List of Education Institutes
 */
export function getEducationInstitute() {
  return async (dispatch, getState) => {
    var params = {
      limit: 10000
    };
    const source = axios.CancelToken.source();
    cancelApiRequests.push(source);
    try {
      const response = await dispatch(
        getEducationInstituteBegin(
          API_URLS.AUTH.LIST_EDUCATION_INSTITUTE,
          params,
          source
        )
      );
      if (response.payload) {
        const { data } = response.payload;
        return data;
      }

      throw response;
    } catch (error) {
      throw error.response;
    }
  };
};

export const getEducationInstituteBegin = (API_URL, params, source) => ({
  type: LIST_EDUCATION_INSTITUTE,
  payload: {
    request: {
      url: API_URL,
      method: 'get',
      params: params,
      paramsSerializer: function(params) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      },
      cancelToken: source.token
    }
  }
});

/**
 *  Signup/Register Users
 */
export function registerUser(formData) {
  return async (dispatch, getState) => {
    const { firstName, lastName, email, password, confirmPassword, student, place } = formData;
    var params = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: confirmPassword,
      role: 1,
      student_identifier: student,
      education_inst_id: place,
    };
    const source = axios.CancelToken.source();
    cancelApiRequests.push(source);
    try {
      const response = await dispatch(
        registerUserBegin(
          API_URLS.AUTH.SIGNUP,
          params,
          source
        )
      );
      if (response.payload) {
        const { data } = response.payload;
        return data;
      }

      throw response;
    } catch (error) {
      throw error.response;
    }
  };
}

export const registerUserBegin = (API_URL, params, source) => ({
  type: REGISTER_USER,
  payload: {
    request: {
      url: API_URL,
      method: 'post',
      data: JSON.stringify(params),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      cancelToken: source.token
    }
  }
});

export function cancelAllApiRequests() {
  return dispatch => {
    cancelApiRequests.forEach(apiRequest => {
      apiRequest.cancel()
    })
    dispatch(cancelAllApiRequestsBegin())
  }
};

export const cancelAllApiRequestsBegin = () => ({
  type: CANCEL_ALL_API_REQUESTS
});
