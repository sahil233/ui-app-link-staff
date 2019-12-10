/**
 *  Import action creator constants
 */
import { fromJS } from 'immutable';
import { success } from '../../utils/redux';
import { LIST_EDUCATION_INSTITUTE, CANCEL_ALL_API_REQUESTS } from './constants';

/**
 *  Set intial state
 */
const initialState = fromJS({
  educationInstitute: []
});

/**
 *  Define the reducer with actions
 */
function authReducer(state = initialState, action) {
  switch (action.type) {
    case success(LIST_EDUCATION_INSTITUTE):
      const { data } = action.payload.data;
      return fromJS({
        ...state.toJS(),
        educationInstitute: data && data.length > 0 ? data : [],
      })

    case CANCEL_ALL_API_REQUESTS:
      return fromJS({
        ...initialState.toJS()
      })

    default:
      return state
  }
}

/**
 *  Export the reducer
 */
export default authReducer
