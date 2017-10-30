/* eslint no-undef: 0, max-statements:0, import/first: 0 */

import {
    getUserProfilesArray,
    getUserProfilesArraySuccess,
    getUserProfilesArrayError,
    getDivisionsArray,
    getDivisionsArraySuccess,
    getDivisionsArrayError,
    GET_USER_PROFILE_ARRAY,
    GET_USER_PROFILE_ARRAY_SUCCESS,
    GET_USER_PROFILE_ARRAY_FAILED,
    GET_DIVISIONS_ARRAY,
    GET_DIVISIONS_ARRAY_SUCCESS,
    GET_DIVISIONS_ARRAY_FAILED,
    mainPageReducer,
    getUserProfilesArrayNonBlockSaga,
    getUserProfilesArraySaga,
    getDivisionsArrayNonBlockSaga,
    getDivisionsArraySaga,
    mainPageSaga
} from './reducer';

describe('MainPage reducer', () => {
    it('getUserProfilesArray should create expected object', () => {
        const expectedResult = {type: GET_USER_PROFILE_ARRAY};
        expect(getUserProfilesArray()).toEqual(expectedResult);
    });

    it('getUserProfilesArraySuccess should create expected object', () => {
        const expectedResult = {
            type: GET_USER_PROFILE_ARRAY_SUCCESS,
            payload: {
                userProfilesArray: [
                    {id: 1, name: 'first', order: 1},
                    {id: 3, name: 'third', order: 3},
                    {id: 2, name: 'second', order: 2}
                ]
            }
        };
        expect(getUserProfilesArraySuccess([
            {id: 1, name: 'first', order: 1},
            {id: 3, name: 'third', order: 3},
            {id: 2, name: 'second', order: 2}
        ])).toEqual(expectedResult);
    });

    it('getUserProfilesArrayError should create expected object', () => {
        const expectedResult = {
            type: GET_USER_PROFILE_ARRAY_FAILED,
            payload: {error: {text: 'error'} }
        };
        expect(getUserProfilesArrayError({text: 'error'})).toEqual(expectedResult);
    });

    it('getDivisionsArraySuccess should create expected object', () => {
        const expectedResult = {
            type: GET_DIVISIONS_ARRAY_SUCCESS,
            payload: {
                divisionsArray: [
                    {id: 1, title: 'first', HID: 1},
                    {id: 3, title: 'third', HID: 3},
                    {id: 2, title: 'second', HID: 2}
                ]
            }
        };
        expect(getDivisionsArraySuccess([
            {id: 1, title: 'first', HID: 1},
            {id: 3, title: 'third', HID: 3},
            {id: 2, title: 'second', HID: 2}
        ])).toEqual(expectedResult);
    });

    it('getDivisionsArrayError should create expected object', () => {
        const expectedResult = {
            type: GET_DIVISIONS_ARRAY_FAILED,
            payload: {error: {text: 'error'} }
        };
        expect(getDivisionsArrayError({text: 'error'})).toEqual(expectedResult);
    });

    it('getDivisionsArray should create expected object', () => {
        const expectedResult = {type: GET_DIVISIONS_ARRAY};
        expect(getDivisionsArray()).toEqual(expectedResult);
    });

    it('mainPageReducer with action GET_USER_PROFILE_ARRAY_SUCCESS should return expected state', () => {
        const defaultState = {
            userProfilesArray: [],
            divisionsArray: [],
            error: {}
        };
        const action = {
            type: GET_USER_PROFILE_ARRAY_SUCCESS,
            payload: {
                userProfilesArray: [
                    {id: 1, name: 'first', order: 1},
                    {id: 3, name: 'third', order: 3},
                    {id: 2, name: 'second', order: 2}
                ]
            }
        };
        const expectedResult = {
            userProfilesArray: [
                {id: 1, name: 'first', order: 1},
                {id: 3, name: 'third', order: 3},
                {id: 2, name: 'second', order: 2}
            ],
            divisionsArray: [],
            error: {}
        };
        expect(mainPageReducer(defaultState, action)).toEqual(expectedResult);
    });

    it('mainPageReducer with action GET_USER_PROFILE_ARRAY_FAILED should return expected state', () => {
        const defaultState = {
            userProfilesArray: [],
            divisionsArray: [],
            error: {}
        };
        const action = {
            type: GET_USER_PROFILE_ARRAY_FAILED,
            payload: {
                error: {text: 'error'}
            }
        };
        const expectedResult = {
            userProfilesArray: [],
            divisionsArray: [],
            error: {text: 'error'}
        };
        expect(mainPageReducer(defaultState, action)).toEqual(expectedResult);
    });

    it('mainPageReducer with action GET_DIVISIONS_ARRAY_SUCCESS should return expected state', () => {
        const defaultState = {
            userProfilesArray: [],
            divisionsArray: [],
            error: {}
        };
        const action = {
            type: GET_DIVISIONS_ARRAY_SUCCESS,
            payload: {
                divisionsArray: [
                    {id: 1, title: 'first', HID: 1},
                    {id: 3, title: 'third', HID: 3},
                    {id: 2, title: 'second', HID: 2}
                ]
            }
        };
        const expectedResult = {
            userProfilesArray: [],
            divisionsArray: [
                {id: 1, title: 'first', HID: 1},
                {id: 3, title: 'third', HID: 3},
                {id: 2, title: 'second', HID: 2}
            ],
            error: {}
        };
        expect(mainPageReducer(defaultState, action)).toEqual(expectedResult);
    });

    it('mainPageReducer with action GET_DIVISIONS_ARRAY_FAILED should return expected state', () => {
        const defaultState = {
            userProfilesArray: [],
            divisionsArray: [],
            error: {}
        };
        const action = {
            type: GET_DIVISIONS_ARRAY_FAILED,
            payload: {
                error: {text: 'error'}
            }
        };
        const expectedResult = {
            userProfilesArray: [],
            divisionsArray: [],
            error: {text: 'error'}
        };
        expect(mainPageReducer(defaultState, action)).toEqual(expectedResult);
    });

    it('mainPageReducer with invald (ACTION) action should return expected state', () => {
        const defaultState = {
            chapterArray: []
        };
        const action = {
            type: 'ACTION',
            payload: 'something'
        };
        const expectedResult = {
            chapterArray: []
        };
        expect(mainPageReducer(defaultState, action)).toEqual(expectedResult);
    });

    it('getUserProfilesArraySaga should be in loop and return expected values', () => {
        const generator = getUserProfilesArraySaga();

        const firstYield = generator.next();
        const secondYield = generator.next();
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(secondYield.value.FORK.fn.name).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('getUserProfilesArrayNonBlockSaga should return 2 expected yields. 3 yield should be in state Done', () => {
        const generator = getUserProfilesArrayNonBlockSaga();
        const userProfilesArray = [
            {id: 1, name: 'Ben', order: 1},
            {id: 3, name: 'Suzan', order: 3},
            {id: 2, name: 'John', order: 2}
        ];

        const firstYield = generator.next();
        const secondYield = generator.next({userProfilesArray});
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(firstYield.value.CALL.fn.name).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('getUserProfilesArrayNonBlockSaga on fail should return 2 expected yields. 3 yield should be in state Done', () => {
        const generator = getUserProfilesArrayNonBlockSaga();
        const error = 'some error';

        const firstYield = generator.next();
        const secondYield = generator.next({error});
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(firstYield.value.CALL.fn.name).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('getDivisionsArraySaga should be in loop and return expected values', () => {
        const generator = getDivisionsArraySaga();

        const firstYield = generator.next();
        const secondYield = generator.next();
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(secondYield.value.FORK.fn.name).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('getDivisionsArrayNonBlockSaga on success should return 2 expected yields. 3 yield should be in state Done', () => {
        const generator = getDivisionsArrayNonBlockSaga();
        const divisionsArray = [
            {id: 1, title: 'Soda', HID: 1},
            {id: 3, title: 'Water inc.', HID: 3},
            {id: 2, title: 'Clean water family company', HID: 2}
        ];

        const firstYield = generator.next();
        const secondYield = generator.next({divisionsArray});
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(firstYield.value.CALL.fn.name).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('getDivisionsArrayNonBlockSaga on fail should return 2 expected yields. 3 yield should be in state Done', () => {
        const generator = getDivisionsArrayNonBlockSaga();
        const error = 'some error';

        const firstYield = generator.next();
        const secondYield = generator.next({error});
        const thirdYield = generator.next();

        expect(firstYield).toMatchSnapshot();
        expect(firstYield.value.CALL.fn.name).toMatchSnapshot();
        expect(secondYield).toMatchSnapshot();
        expect(thirdYield).toMatchSnapshot();
    });

    it('mainPageSaga should return 1 yield with 2 sagas. 2d yield should be in state Done', () => {
        const generator = mainPageSaga();
        expect(generator.next()).toMatchSnapshot();
        expect(generator.next()).toMatchSnapshot();
    });
});