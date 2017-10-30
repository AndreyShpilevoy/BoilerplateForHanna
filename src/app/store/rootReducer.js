import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {layoutReducer} from 'containers/Layout/reducer';
import {mainPageReducer} from 'containers/MainPage/reducer';

const rootReducer = combineReducers({
    layoutReducer,
    mainPageReducer,
    routing: routerReducer
});

export default rootReducer;