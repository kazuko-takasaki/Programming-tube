import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import {db} from '../firebase/index';
import {makeStyles} from '@material-ui/styles';
import CategoryButton from '../components/UI/CategoryButton';
import PrimaryButton from '../components/UI/PrimaryButton';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
    images: {
        [theme.breakpoints.down('sm')]: {
            margin : '0 auto 24px auto'
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto'
        },
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 500
        },
    }
}))


const ChannelDetail = () => {
    const selector = useSelector((state) => state);
    const path = selector.router.location.pathname;
    const classes = useStyles();
    const dispatch = useDispatch();

    const id = path.split('/channel/')[1];
    const [channel,setChannel] = useState(null);

    useEffect( () => {
        db.collection('channels').doc(id).get()
            .then (snapshot => {
                const data = snapshot.data();
                setChannel(data)
        })
    },[id]);


    return(
        <section className='c-section-wrapin'>
            {channel && (
                <div className='p-grid_row'>
                    <div className={classes.images}>
                            <a href={`https://www.youtube.com/watch?v=${channel.thumbnail}`}>
                                <img src={`https://img.youtube.com/vi/${channel.thumbnail}/mqdefault.jpg`} alt='thumbnail'></img>
                            </a>
                            <p　className='u-text_p'>◆タイトル</p>
                                <CategoryButton label={channel.title} />
                            <p className='u-text_p'>◆カテゴリー</p>
                                <CategoryButton label={channel.category} />
                    </div>
                                
                    <div className={classes.detail}>
                        <p>{channel.description}</p>
                            <div className='center'>
                                <div className="module-spacer--medium" />
                                <PrimaryButton
                                    label={'チャンネル一覧に戻る'}
                                    onClick={ () => dispatch(push('/'))}
                                />
                            </div>        
                    </div>
            </div>
            )}
        </section>
    )
}
export default ChannelDetail