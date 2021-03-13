export const DELETE_CHANNELS = 'DELETE_CHANNELS';
export const deleteChannelAction = (nextChannels) => {
    return {
        type:'FETCH_CHANNELS',
        payload: nextChannels
    }
}

export const FETCH_CHANNELS = 'FETCH_CHANNELS';
export const fetchChannelAction = (channels) => {
    return {
        type:'FETCH_CHANNELS',
        payload: channels
    }
}
