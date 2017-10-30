/* eslint no-undef: 0*/

import {
    userProfilesArraySelector,
    divisionsArraySelector,
    sortedUserProfilesArraySelector
} from './selectors';

describe('Conference selectors', () => {
    it('userProfilesArraySelector should return expected array', () => {
        const state = {
            mainPageReducer: {
                userProfilesArray: [
                    {id: 1, name: 'first', order: 1},
                    {id: 3, name: 'third', order: 3},
                    {id: 2, name: 'second', order: 2}
                ]
            }
        };
        const expectedResult = state.mainPageReducer.userProfilesArray;
        expect(userProfilesArraySelector(state)).toEqual(expectedResult);
    });

    it('sortedUserProfilesArraySelector should return expected sorted array', () => {
        const state = {
            mainPageReducer: {
                userProfilesArray: [
                    {id: 1, name: 'first', order: 1},
                    {id: 3, name: 'third', order: 3},
                    {id: 2, name: 'second', order: 2}
                ]
            }
        };
        const expectedResult = [
            {id: 1, name: 'first', order: 1},
            {id: 2, name: 'second', order: 2},
            {id: 3, name: 'third', order: 3}
        ];
        expect(sortedUserProfilesArraySelector(state)).toEqual(expectedResult);
    });

    it('divisionsArraySelector should return expected array', () => {
        const state = {
            mainPageReducer: {
                divisionsArray: [
                    {id: 1, title: 'first', HID: 1},
                    {id: 2, title: 'second', HID: 2}
                ]
            }
        };
        const expectedResult = state.mainPageReducer.divisionsArray;
        expect(divisionsArraySelector(state)).toEqual(expectedResult);
    });
});