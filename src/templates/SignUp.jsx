import {useState,useCallback} from 'react';
import {signUp} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import TextInput from '../components/UI/TextInput';
import PrimaryButton from '../components/UI/PrimaryButton';

const SignUp = () => {
    const dispatch = useDispatch();

    const   [username, setUsername] = useState(""),
            [email, setEmail] = useState(""),
            [password, setPassword] = useState(""),
            [checkPassword, setCheckPassword] = useState("");

    //ユーザー名
    const inputUsername = useCallback ( (e) => {
        setUsername(e.target.value)
    }, [setUsername]);

    //メールアドレス
    const inputEmail = useCallback ( (e) => {
        setEmail(e.target.value)
    }, [setEmail])

    //パスワード
    const inputPassword = useCallback ( (e) => {
        setPassword(e.target.value)
    }, [setPassword])

    //パスワード確認用
    const inputCheckPassword = useCallback ( (e) => {
        setCheckPassword(e.target.value)
    }, [setCheckPassword])


    return(
        <div className="c-section-container">
            <h1 className="u-text_headline u-text-center">Programming Tube</h1>
            <div className="module-spacer--medium" />
            <h2 className="u-text_headline u-text-center">アカウント登録</h2>
            <TextInput
                fullWidth={true} label={'ユーザー名'} multiLine={false} required={true}
                rows={1} value={username} type={'text'} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={'メールアドレス'} multiLine={false} required={true}
                rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={'パスワード'} multiLine={false} required={true}
                rows={1} value={password} type={'password'} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={'確認用パスワード'} multiLine={false} required={true}
                rows={1} value={checkPassword} type={'password'} onChange={inputCheckPassword}
            />
            <div className="module-spacer--medium" />
            <div className='center'>
                <PrimaryButton
                    label={'アカウント登録する'}
                    onClick={ () => dispatch(signUp(username,email,password,checkPassword))}
                />
            </div>
            <div className="module-spacer--medium" />
            <div className='center'>
                <PrimaryButton
                    label={'アカウントをお持ちの方はこちら'}
                    onClick={ () => dispatch(push('/signin'))}
                />
            </div>
        </div>
    )
}

export default SignUp