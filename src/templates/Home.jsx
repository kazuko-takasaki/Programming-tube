import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {signOut} from '../reducks/users/operations';
import {getUserId} from '../reducks/users/selectors';


const Home = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const uid = getUserId(selector)

    return (
        <div>
            <h2>ホーム</h2>
            <p>{uid}</p>
            <button onClick={() => dispatch(signOut())}>ログアウト</button>
        </div>
    )
};
export default Home