const {
    CAST_OFFLINE,
    CAST_ONLINE,
    CAST_IDLE,
    APPLICATION_LAUNCH,
    APPLICATION_EXIT,
    MEDIA_STATE_PLAYING,
    MEDIA_STATE_PAUSED,
    MEDIA_STATE_IDLE,
    MEDIA_STATE_BUFFERING,
    MEDIA_METADATA,
    MEDIA_DURATION,
    MEDIA_CURRENT_TIME,
    MEDIA_PLAYBACK_RATE,
    VOLUME_CHANGE,
    VOLUME_MUTE,
    VOLUME_UNMUTE
} = require('../actions');

const reduceDevice = (state, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return {
                name: action.payload.txtRecord.fn,
                id: action.payload.name,
                idle: true
            };
        case CAST_IDLE:
            return Object.assign({}, state, {
                idle: true
            });
        case VOLUME_CHANGE:
            return Object.assign({}, state, {
                volume: action.payload.volume
            });
        case VOLUME_MUTE:
            return Object.assign({}, state, {
                mute: true
            });
        case VOLUME_UNMUTE:
            return Object.assign({}, state, {
                mute: false
            });
        case APPLICATION_LAUNCH: {
            const { appId, displayName, statusText, namespaces } = action.payload.application;
            return Object.assign({}, state, {
                application: {
                    id: appId,
                    displayName,
                    statusText,
                    namespaces: namespaces.map(({ name }) => name)
                },
                idle: false
            });
        }
        case APPLICATION_EXIT:
            return Object.assign({}, state, {
                application: undefined,
                media: undefined,
                idle: true
            });
        case MEDIA_STATE_PLAYING:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    state: 'PLAYING'
                })
            });
        case MEDIA_STATE_PAUSED:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    state: 'PAUSED'
                })
            });
        case MEDIA_STATE_IDLE:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    state: 'IDLE'
                })
            });
        case MEDIA_STATE_BUFFERING:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    state: 'BUFFERING'
                })
            });
        case MEDIA_METADATA:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    metadata: action.payload.metadata
                })
            });
        case MEDIA_DURATION:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    duration: action.payload.duration
                })
            });
        case MEDIA_CURRENT_TIME:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    currentTime: action.payload.time
                })
            });
        case MEDIA_PLAYBACK_RATE:
            return Object.assign({}, state, {
                media: Object.assign({}, state.media, {
                    playbackRate: action.payload.rate
                })
            });
        default:
            return state;
    }
};

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return Object.assign({}, state, {
                [action.payload.name]: reduceDevice({}, action)
            });
        case CAST_OFFLINE: {
            const deviceNames = Object.getOwnPropertyNames(state)
                .filter(device => device !== action.payload);
            const result = {};
            deviceNames.forEach(name => {
                result[name] = state[name];
            });
            return result;
        }
        case APPLICATION_LAUNCH:
        case MEDIA_METADATA:
        case MEDIA_DURATION:
        case MEDIA_CURRENT_TIME:
        case MEDIA_PLAYBACK_RATE:
        case VOLUME_CHANGE:
            return Object.assign({}, state, {
                [action.payload.device]: reduceDevice(state[action.payload.device], action)
            });
        case MEDIA_STATE_PLAYING:
        case MEDIA_STATE_PAUSED:
        case MEDIA_STATE_IDLE:
        case MEDIA_STATE_BUFFERING:
        case APPLICATION_EXIT:
        case CAST_IDLE:
        case VOLUME_MUTE:
        case VOLUME_UNMUTE:
            return Object.assign({}, state, {
                [action.payload]: reduceDevice(state[action.payload], action)
            });
        default:
            return state;
    }
};

module.exports = reduce;
