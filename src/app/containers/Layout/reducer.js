import {getLocaleApi} from 'api';
import {all, call, put, take, fork} from 'redux-saga/effects';

const initialState = {
    locale: 'EN'
};

export const GET_LOCALE = 'GET_LOCALE';
export const getLocale = () => ({type: GET_LOCALE});
export const GET_LOCALE_SUCCESS = 'GET_LOCALE_SUCCESS';
export const getLocaleSuccess = locale => ({type: GET_LOCALE_SUCCESS, payload: {locale} });
export const GET_LOCALE_FAILED = 'GET_LOCALE_FAILED';
export const getLocaleError = error => ({type: GET_LOCALE_FAILED, payload: {error} });

export const layoutReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_LOCALE_SUCCESS:
            return {...state, locale: payload.locale};
        case GET_LOCALE_FAILED:
            return {...state, error: payload.error};
        default:
            break;
    }
    return state;
};

/* eslint-disable func-style, func-names */
export const getLocaleNonBlockSaga = function* () {
    const {locale, error} = yield call(getLocaleApi);
    if (locale) {
        yield put(getLocaleSuccess(locale));
    } else {
        yield put(getLocaleError(error));
    }
};

export const getLocaleSaga = function* () {
    for (;;) {
        yield take(GET_LOCALE);
        yield fork(getLocaleNonBlockSaga);
    }
};

export const layoutSaga = function* () {
    yield all([
        getLocaleSaga()
    ]);
};
/* eslint-enable func-style, func-names */