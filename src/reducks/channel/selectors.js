import {createSelector} from 'reselect';

const channelSelector = (state) => state.channels;

export const getChannels = createSelector (
    [channelSelector],
    state => state.list
)
