import * as Action from './action'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Action.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        case Action.SIGN_OUT:
            return {
                ...action.payload
            };
        case Action.FETCH_FAVORITES:
            return {
                ...state,
                    favorites: {
                    list: [...action.payload]
                }
            };
        default:
            return state
    }
};