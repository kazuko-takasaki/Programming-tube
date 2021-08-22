import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {db} from '../firebase/index';
import {makeStyles} from '@material-ui/core/styles';
import PrimaryButton from '../components/UI/PrimaryButton';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import CategoryIcon from '@material-ui/icons/Category';
import StyleIcon from '@material-ui/icons/Style';

const useStyles = makeStyles((theme) => ({
    images: {
            margin : '0 auto',
            width: 450
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 450
        },
    }
}));

const ChannelDetail = () => {
    const selector = useSelector((state) => state);
    const path = selector.router.location.pathname;
    const classes = useStyles();
    const dispatch = useDispatch();

    const id = path.split('/channel/')[1];
    const [channel,setChannel] = useState(null);

    //channelIDで指定したチャンネル情報取得
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
                                <img src={`https://img.youtube.com/vi/${channel.thumbnail}/mqdefault.jpg`} alt='thumbnail' width='450'></img>
                            </a>
                            <div className="module-spacer--medium" />
                                <div　className='p-title'>
                                    <p><StyleIcon />タイトル</p>
                                </div>
                                <p className='p-text'>{channel.title}</p>
                                <div className='p-title'>
                                    <p><CategoryIcon />カテゴリー</p>
                                </div>
                                <p className='p-text'>{channel.category}</p>
                                <p className='p-text'>画像をクリックするとYoutubeが再生されます</p>
                    </div>          
                    <div className={classes.detail}>
                        <div className='center'>
                            <p className='p-title'>PRポイント</p>
                            <p>{channel.description}</p>
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
};

export default ChannelDetail