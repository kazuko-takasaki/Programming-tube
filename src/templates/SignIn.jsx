import TextInput from '../components/UI/TextInput';
import PrimaryButton from '../components/UI/PrimaryButton';
import {useState,useCallback} from 'react';
import {signIn} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import titleLogo from '../assets/images/tubelogo.png';


const SignIn = () => {
    const dispatch = useDispatch();
    const   [email, setEmail] = useState(""),
            [password, setPassword] = useState("")

    //メールアドレス
    const inputEmail = useCallback ( (e) => {
        setEmail(e.target.value)
    }, [setEmail])

    //パスワード
    const inputPassword = useCallback ( (e) => {
        setPassword(e.target.value)
    }, [setPassword])

    return(
        <>
            <div className="cover">
                <img src={titleLogo} alt='logo' width='300px'/>
                <div className="module-spacer--small" />
                <p>MyプログラミングチャンネルをPRする</p>
                <p>学べるプログラミングチャンネルを探す</p>
            </div>
            <div className="c-section-container">
                <div className="module-spacer--small" />
                <h2 className="u-text_headline u-text-center">ログイン</h2>
                <TextInput
                    fullWidth={true} label={'メールアドレス'} multiLine={false} required={true}
                    rows={1} value={email} type={'email'} onChange={inputEmail}
                />
                <TextInput
                    fullWidth={true} label={'パスワード'} multiLine={false} required={true}
                    rows={1} value={password} type={'password'} onChange={inputPassword}
                />
                <div className="module-spacer--medium" />
                    <div>
                        <p>メールアドレス：test001@gmail.com</p>
                        <p>パスワード：test001でログインできます。</p>
                    </div>
                <div className="module-spacer--medium" />
                <div className='center'>
                    <PrimaryButton
                        label={'ログイン'}
                        onClick={ () => dispatch(signIn(email,password))}
                    />
                </div>
                <div className="module-spacer--medium" />
                <div className='center'>
                    <PrimaryButton
                        label={'新規登録はこちら'}
                        onClick={ () => dispatch(push('/signup'))}
                    />
                </div>
            </div>
        </>
    )
};

export default SignIn