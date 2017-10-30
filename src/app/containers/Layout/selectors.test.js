/* eslint no-undef: 0*/

import {
    localeSelector
} from './selectors';

describe('Layout selectors', () => {
    it('localeSelector should return expected string', () => {
        const state = {
            layoutReducer: {
                locale: 'EN'
            }
        };
        const expectedResult = state.layoutReducer.locale;
        expect(localeSelector(state)).toEqual(expectedResult);
    });
});