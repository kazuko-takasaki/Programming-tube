import {db, FirebaseTimestamp} from '../../firebase';
import {push} from 'connected-react-router';
import {deleteChannelAction,fetchChannelAction} from './actions';

const channelRef = db.collection('channels');

//チャンネル削除
export const deleteChannel = (id) => {
    return async (dispatch,getState) => {
        channelRef.doc(id).delete()
            .then(() => {
                const prevChannels = getState().channels.list;
                const nextChannels = prevChannels.filter(channel => channel.id !== id)
                dispatch(deleteChannelAction(nextChannels))
            })
    }
};

//チャンネルピックアップ
export const fetchChannels = (category) => {
    return async (dispatch) => {
        let query = channelRef.orderBy('updated_at','desc');
            query = (category !== '') ? query.where('category', '==', category) : query

            query.get()
                .then(snapshots => {
                    const channelList = []
                    snapshots.forEach(snapshot => {
                        const channel = snapshot.data();
                        console.log(channel);
                        channelList.push(channel)
                    })
                    dispatch(fetchChannelAction(channelList))
        })
    }
};

//チャンネルの投稿
export const saveChannel = (id,uid,title,description,url,thumbnail,category,images) => {   
    
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            title: title,
            description: description,
            category: category,
            url: url,
            thumbnail: thumbnail,
            images: images,
            updated_at: timestamp,
            uid: uid
        }

        if (id === '') {
            const ref = channelRef.doc();
            id = ref.id
            data.id = id
            data.created_at = timestamp
        }

        return channelRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            })
    }
};

//投稿したチャンネルの編集
export const editChannel = (id,uid,title,description,url,thumbnail,category,images) => {   
    
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            title: title,
            description: description,
            category: category,
            url: url,
            thumbnail: thumbnail,
            images: images,
            updated_at: timestamp,
            uid: uid
        }

        return channelRef.doc(id).set(data, {marge: true})
            .then(() => {
                dispatch(push('/'))
            })
    }
};