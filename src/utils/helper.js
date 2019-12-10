import { showErrorMsg } from './notification';

/**
 * Handle API Error Reponse
 *
 * @param err
 */
export const httpHandleError = error => {
  /* error = { error, config, code, request, response } */
  try {
    var xhr = error.request
    if (!xhr.response) {
      return Promise.reject({})
    }

    
    var err = xhr.response;
    if (xhr && xhr.status && err) {
      switch (xhr.status) {
        case 400:
        case 401:
        case 404:
          showErrorMsg(err.message)
          break;
        case 422:
          if (err.errors) {
            showErrorMsg(err.errors[Object.keys(err.errors)[0]][0]);
            break;
          }
          showErrorMsg(err.message)
          break;

        default:
          showErrorMsg("An internal error occur")
      }
    } else {
      showErrorMsg("An internal error occur")
    }
    return Promise.reject({})
  } catch (e) {
    return Promise.reject({})
  }
};
