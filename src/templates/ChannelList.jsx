import {useDispatch, useSelector} from 'react-redux';
import ChannelCard from '../components/channel/ChannelCard';
import {useEffect} from 'react';
import {fetchChannels} from '../reducks/channel/operations';
import {getChannels} from '../reducks/channel/selectors';
import {fetchFavorites} from '../reducks/users/operations';

const ChannelList = () => {
    const dispatch = useDispatch();
    const selector = useSelector( (state) => state);
    const channels = getChannels(selector);

    const uid = selector.users.uid

    console.log(selector)

    const query = selector.router.location.search;
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

    useEffect( () => {
        dispatch(fetchChannels(category))
    },[query]);

    useEffect( () => {
        dispatch(fetchFavorites(uid))
    },[]);


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