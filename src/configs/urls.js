/**
 * Micro Services Prefix
 */
const PREFIX = {
  LINK_STAFF: process.env.REACT_APP_BASE_URL
};

/**
 * URLS
 */
export const API_URLS = {
  AUTH: {
    LOGIN: PREFIX.LINK_STAFF + '/auth/login',
    SIGNUP: PREFIX.LINK_STAFF + '/auth/signup',
    LIST_EDUCATION_INSTITUTE: PREFIX.LINK_STAFF + '/institutes',
  }
};
  