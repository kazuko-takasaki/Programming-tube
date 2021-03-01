import {db, FirebaseTimestamp} from '../../firebase';
import {push} from 'connected-react-router';

const channelRef = db.collection('channels')

export const saveChannel = (title,description,url,category) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            title: title,
            description: description,
            category: category,
            url: url,
            updated_at: timestamp
        }

        console.log(data);
        
        const ref = channelRef.doc();
        const id = ref.id
        data.id = id
        data.created_at = timestamp

        return channelRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
};
