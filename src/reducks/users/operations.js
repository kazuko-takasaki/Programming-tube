import {auth, db, FirebaseTimestamp} from '../../firebase/index';
import {signInAction, signOutAction} from './action'
import {push} from 'connected-react-router';

//認証のリッスン
export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid

                db.collection('users').doc(uid).get()
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
    
}

//新規登録
export const signUp = (username,email,password,checkPassword) => {
    return async (dispatch) => {
        //バリテーション
        if(username === "" || email === "") {
            alert('必須項目が未入力です')
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

                    db.collection('users').doc(uid).set(userInitialData)
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

                db.collection('users').doc(uid).get()
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
    
}

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