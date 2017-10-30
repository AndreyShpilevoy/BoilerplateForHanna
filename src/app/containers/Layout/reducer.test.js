/* eslint no-undef: 0, max-statements:0, import/first: 0 */

jest.mock('api');
import {getLocaleApi} from 'api';
import {
    getLocale,
    getLocaleSuccess,
    getLocaleError,
    GET_LOCALE,
    GET_LOCALE_SUCCESS,
    GET_LOCALE_FAILED,
    layoutReducer,
    getLocaleNonBlockSaga,
    getLocaleSaga,
    layoutSaga
} from './reducer';

describe('Conference reducer', () => {
    it('getLocale should create expected object', () => {
        const expectedResult = {type: GET_LOCALE};
        expect(getLocale()).toEqual(expectedResult);
    });

    it('getLocaleSuccess should create expected object', () => {
        const expectedResult = {
            type: GET_LOCALE_SUCCESS,
            payload: {
                locale: 'NL'
            }
        };
        expect(getLocaleSuccess('NL')).toEqual(expectedResult);
    });

    it('getLocaleError should create expected object', () => {
        const expectedResult = {
            type: GET_LOCALE_FAILED,
            payload: {error: {text: 'error'} }
        };
        expect(getLocaleError({text: 'error'})).toEqual(expectedResult);
    });

    it('layoutReducer with action GET_LOCALE_SUCCESS should return expected state', () => {
        const defaulState = {
            locale: 'EN',
            error: {}
        };
        const action = {
            type: GET_LOCALE_SUCCESS,
            payload: {
                locale: 'NL'
            }
        };
        const expectedResult = {
            locale: 'NL',
            error: {}
        };
        expect(layoutReducer(defaulState, action)).toEqual(expectedResult);
    });

    it('layoutReducer with action GET_LOCALE_FAILED should return expected state', () => {
        const defaulState = {
            locale: 'EN',
            error: {}
        };
        const action = {
            type: GET_LOCALE_FAILED,
            payload: {
                error: {text: 'error'}
            }
        };
        const expectedResult = {
            locale: 'EN',
            error: {text: 'error'}
        };
        expect(layoutReducer(defaulState, action)).toEqual(expectedResult);
    });

    it('layoutReducer with invald (ACTION) action should return expected state', () => {
        const defaulState = {
            locale: 'EN',
            error: {}
        };
        const action = {
            type: 'ACTION',
            payload: 'something'
        };
        const expectedResult = {
            locale: 'EN',
            error: {}
        };
        expect(layoutReducer(defaulState, action)).toEqual(expectedResult);
    });

    it('getLocaleSaga should be in loop and return expected values', () => {
        const generator = getLocaleSaga();

        const firstYield = generator.next();
        const secondYield = generator.next();
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(secondYield.value.FORK.fn.name).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('getLocaleNonBlockSaga on success should return 2 expected yields. 3 yield should be in state Done', () => {
        const generator = getLocaleNonBlockSaga();
        const locale = 'RU';

        const firstYield = generator.next();
        const secondYield = generator.next({locale});
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(firstYield.value.CALL.fn.name).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('getLocaleNonBlockSaga on fail should return 2 expected yields. 3 yield should be in state Done', () => {
        const generator = getLocaleNonBlockSaga();
        const error = 'some error';

        const firstYield = generator.next();
        const secondYield = generator.next({error});
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(firstYield.value.CALL.fn.name).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('layoutSaga should return 1 yield with 1 saga. 2d yield should be in state Done', () => {
        const generator = layoutSaga();
        expect(generator.next()).toMatchSnapshot();
    });
});