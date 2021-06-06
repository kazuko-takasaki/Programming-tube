import {auth, db, FirebaseTimestamp} from '../../firebase/index';
import {signInAction, signOutAction,fetchFavoritesAction} from './action';
import {push} from 'connected-react-router';

const usersRef = db.collection('users')

//認証のリッスン
export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid
                usersRef.doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data();
                    dispatch(signInAction ({
                        isSignedIn: true,
                        role: data.role,
                        uid: uid,
                        username: data.username
                    }))
                })
            }
            else {
                dispatch(push('/signin'))
            }
        })
    }
};

//新規登録
export const signUp = (username,email,password,checkPassword) => {
    return async (dispatch) => {
        //バリテーション
        if(username === "" || email === "" || password === '' || checkPassword === '') {
            alert('必須項目が未入力です')
            return false
        }
        if (password !== checkPassword) {
            alert('パスワードが一致しません。もう1度お試しください。')
            return false
        }
        if (password.length < 6) {
            alert('パスワードは6文字以上で入力してください。')
            return false
        }
        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                if(user) {
                    const uid = user.uid
                    const timestamp =FirebaseTimestamp.now()
                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: 'customer',
                        uid: uid,
                        username: username
                    }
                    usersRef.doc(uid).set(userInitialData)
                        .then(() =>{
                            dispatch(push('/'))
                        })
                }
            }) 
    }
};

//ログイン
export const signIn = (email, password) => {
    return async (dispatch) => {
    auth.signInWithEmailAndPassword(email,password)
        .then (result => {
            const user = result.user
            if (user) { 
                const uid = user.uid
                usersRef.doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }))
                        dispatch(push('/'))
                    })
            }
        })
    }
};

//ログアウト
export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then( () => {
                dispatch(signOutAction());
                dispatch(push('/signin'))
            })
    }
}

//いいね追加
export const favoriteAdd = (channelId,channelTitle,uid) => {
    return async () => {
        
        const data = {
            channelId: channelId,
            title: channelTitle,
            uid: uid
        }
        console.log(data)
        return usersRef.doc(uid).collection('favorite').doc(channelId)
            .set(data)
    }
};

//いいねチャンネル取得
export const fetchFavorites = (uid) => {
    return async (dispatch) => {
        usersRef.doc(uid).collection('favorite').get()
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

//いいね解除
export const deleteFavorites = (id,uid) => {
    return async () => {
        usersRef.doc(uid).collection('favorite').doc(id).delete()
    }
};