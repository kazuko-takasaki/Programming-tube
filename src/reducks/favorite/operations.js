import {db} from '../../firebase';
import {push} from 'connected-react-router';
import {fetchFavoritesAction} from './actions';

const favoriteRef = db.collection('favorites');

export const favoriteAdd = (id,title,uid) => {
    return async (dispatch) => {
        
        const data = {
            channelId: id,
            title: title,
            uid: uid
        }

        return favoriteRef.doc(uid).set(data)
            .then(() => {
                dispatch(push('/'))
        })
    }
};

export const fetchFavorites = (uid) => {
    return async (dispatch) => {
        favoriteRef.doc(uid).get()
                .then(snapshots => {
                    const favoritesList = []
                    snapshots.forEach(snapshot => {
                        const favorite = snapshot.data();
                        favoritesList.push(favorite)
                    })
            dispatch(fetchFavoritesAction(favoritesList))
        })
    }
};

//削除