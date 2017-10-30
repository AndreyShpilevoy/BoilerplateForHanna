import {all} from 'redux-saga/effects';
import {layoutSaga} from 'containers/Layout/reducer';
import {mainPageSaga} from 'containers/MainPage/reducer';

export default function* root() {
    yield all([
        layoutSaga(),
        mainPageSaga()
    ]);
}
