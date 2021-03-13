export const DELETE_FAVORITES = 'DELETE_FAVORITES';
export const deleteFavorite = (nextFavorites) => {
    return {
        type:'DELETE_FAVORITES',
        payload: nextFavorites
    }
};

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const fetchFavoritesAction = (favorites) => {
    return {
        type:'FETCH_FAVORITES',
        payload: favorites
    }
};