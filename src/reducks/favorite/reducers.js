import * as Actions from './actions';
import initialState from '../store/initialState'

export const FavoriteReducer = (state = initialState.favorites, action) => {
    switch (action.type) {
        case Actions.DELETE_FAVORITES:
                return {
                    ...state,
                    list: [...action.payload]
                };
        case Actions.FETCH_FAVORITES:
            return {
                ...state,
                list: [...action.payload]
            };
        default:
            return state
    }
};