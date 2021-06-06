import {useDispatch, useSelector} from 'react-redux';
import ChannelCard from '../components/channel/ChannelCard';
import {useEffect} from 'react';
import {fetchChannels} from '../reducks/channel/operations';
import {getChannels} from '../reducks/channel/selectors'
import {getUserId} from '../reducks/users/selectors'
import {fetchFavorites} from '../reducks/users/operations';

const ChannelList = () => {
    const dispatch = useDispatch();
    const selector = useSelector( (state) => state);
    const channels = getChannels(selector);
    const uid = getUserId(selector);

    //URLのクエリパラメータ
    const query = selector.router.location.search;
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

    //dbのチャンネル情報取得
    useEffect( () => {
        dispatch(fetchChannels(category))
    },[query,category,dispatch]);

    //dbのお気に入り情報取得
    useEffect( () => {
        dispatch(fetchFavorites(uid))
    },[uid,dispatch]);
    
    return (
        <section className='c-section-wrapin'>
            <div className='p-grid_row'>
                {channels.length > 0 && (
                    channels.map(channel => (
                        <ChannelCard 
                        thumbnail={channel.thumbnail}
                        id={channel.id} 
                        key={channel.id} 
                        title={channel.title}
                        images={channel.images} 
                        uid={channel.uid}
                        />
                    ))
                )}
            </div>
        </section>
    )
};

export default ChannelList;