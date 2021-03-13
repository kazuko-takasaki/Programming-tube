import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

//Import reducers
import {UsersReducer} from '../users/reducers';
import {ChannelReducer} from '../channel/reducers';
import {FavoriteReducer} from '../favorite/reducers';

import thunk from 'redux-thunk';

import {connectRouter, routerMiddleware} from 'connected-react-router';

export default function createStore(history) {
    return reduxCreateStore (
        combineReducers ({
            favorites:FavoriteReducer,
            channels:ChannelReducer,
            users: UsersReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );
};
