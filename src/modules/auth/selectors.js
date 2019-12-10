/**
 *  Import node modules
 */
import { createSelector } from 'reselect'

/**
 *  Select the portion of the root reducer
 */
export const auth = () => state => state.get('auth');

/**
 *  Select the correct portion of the root reducer
 */
export const getEducationInstituteList = () =>
  createSelector(auth(), state => {
    const listing = state.get('educationInstitute').toJS()
    return listing.length > 0 ? listing : []
  });
