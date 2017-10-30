import {createSelector} from 'reselect';
import {sortBy, prop} from 'ramda';

export const userProfilesArraySelector = state => state.mainPageReducer.userProfilesArray;
export const divisionsArraySelector = state => state.mainPageReducer.divisionsArray;

export const sortedUserProfilesArraySelector = createSelector(
    userProfilesArraySelector,
    userProfilesArray => sortBy(prop('order'), userProfilesArray)
);