const {
    CAST_OFFLINE,
    CAST_ONLINE,
    MEDIA_STATUS
} = require('../actions');

const reduceDevice = (state, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return {
                last: null,
                current: null
            };
        case MEDIA_STATUS: {
            const status = action.payload.status;
            return {
                last: state.current,
                current: status
            };
        }
        default:
            return state;
    }
};

const reduce = (state = {}, action) => {
    switch (action.type) {
        case CAST_ONLINE:
            return Object.assign({}, state, {
                [action.payload.name]: {}
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
        case MEDIA_STATUS:
            return Object.assign({}, state, {
                [action.payload.device]: reduceDevice(state[action.payload.device], action)
            });
        default:
            return state;
    }
};

module.exports = reduce;
