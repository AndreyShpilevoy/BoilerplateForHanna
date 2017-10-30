import {all, call, put, take, fork} from 'redux-saga/effects';
import {getUserProfilesArrayApi, getDivisionsArrayApi} from 'api';

const initialState = {
    userProfilesArray: [],
    divisionsArray: [],
    error: {}
};

export const GET_USER_PROFILE_ARRAY = 'GET_USER_PROFILE_ARRAY';
export const getUserProfilesArray = () => ({type: GET_USER_PROFILE_ARRAY});
export const GET_USER_PROFILE_ARRAY_SUCCESS = 'GET_USER_PROFILE_ARRAY_SUCCESS';
export const getUserProfilesArraySuccess = userProfilesArray => ({type: GET_USER_PROFILE_ARRAY_SUCCESS, payload: {userProfilesArray} });
export const GET_USER_PROFILE_ARRAY_FAILED = 'GET_USER_PROFILE_ARRAY_FAILED';
export const getUserProfilesArrayError = error => ({type: GET_USER_PROFILE_ARRAY_FAILED, payload: {error} });

export const GET_DIVISIONS_ARRAY = 'GET_DIVISIONS_ARRAY';
export const getDivisionsArray = () => ({type: GET_DIVISIONS_ARRAY});
export const GET_DIVISIONS_ARRAY_SUCCESS = 'GET_DIVISIONS_ARRAY_SUCCESS';
export const getDivisionsArraySuccess = divisionsArray => ({type: GET_DIVISIONS_ARRAY_SUCCESS, payload: {divisionsArray} });
export const GET_DIVISIONS_ARRAY_FAILED = 'GET_DIVISIONS_ARRAY_FAILED';
export const getDivisionsArrayError = error => ({type: GET_DIVISIONS_ARRAY_FAILED, payload: {error} });

export const mainPageReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_USER_PROFILE_ARRAY_SUCCESS:
            return {...state, userProfilesArray: payload.userProfilesArray};
        case GET_USER_PROFILE_ARRAY_FAILED:
            return {...state, error: payload.error};
        case GET_DIVISIONS_ARRAY_SUCCESS:
            return {...state, divisionsArray: payload.divisionsArray};
        case GET_DIVISIONS_ARRAY_FAILED:
            return {...state, error: payload.error};
        default:
            break;
    }
    return state;
};


/* eslint-disable func-style, func-names */
export const getUserProfilesArrayNonBlockSaga = function* () {
    const {userProfilesArray, error} = yield call(getUserProfilesArrayApi);

    if (userProfilesArray) {
        yield put(getUserProfilesArraySuccess(userProfilesArray));
    } else {
        yield put(getUserProfilesArrayError(error));
    }
};

export const getUserProfilesArraySaga = function* () {
    for (;;) {
        yield take(GET_USER_PROFILE_ARRAY);
        yield fork(getUserProfilesArrayNonBlockSaga);
    }
};


export const getDivisionsArrayNonBlockSaga = function* () {
    const {divisionsArray, error} = yield call(getDivisionsArrayApi);
    if (divisionsArray) {
        yield put(getDivisionsArraySuccess(divisionsArray));
    } else {
        yield put(getDivisionsArrayError(error));
    }
};

export const getDivisionsArraySaga = function* () {
    for (;;) {
        yield take(GET_DIVISIONS_ARRAY);
        yield fork(getDivisionsArrayNonBlockSaga);
    }
};

export const mainPageSaga = function* () {
    yield all([
        getUserProfilesArraySaga(),
        getDivisionsArraySaga()
    ]);
};
/* eslint-enable func-style, func-names */