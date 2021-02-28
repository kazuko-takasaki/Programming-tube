import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

//Import reducers
import {UsersReducer} from '../users/reducers'

import thunk from 'redux-thunk';

import {connectRouter, routerMiddleware} from 'connected-react-router';

export default function createStore(history) {
    return reduxCreateStore (
        combineReducers ({
            users: UsersReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );
};
