/* eslint import/no-extraneous-dependencies: 'off' */

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import root from 'lodash._root';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        root.devToolsExtension && root.devToolsExtension(),
        applyMiddleware(
            sagaMiddleware,
            reduxImmutableStateInvariant()
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
