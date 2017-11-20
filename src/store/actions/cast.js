const CAST_ONLINE = '[Device] Online';
const CAST_OFFLINE = '[Device] Offline';
const CAST_STATUS = '[Device] Status';
const CAST_IDLE = '[Device] Idle';

const castOnline = service => ({
    type: CAST_ONLINE,
    payload: service
});

const castOffline = service => ({
    type: CAST_OFFLINE,
    payload: service.name
});

const castStatus = (device, status) => ({
    type: CAST_STATUS,
    payload: {
        device,
        status
    }
});

const castIdle = device => ({
    type: CAST_IDLE,
    payload: device
});

module.exports = {
    CAST_ONLINE,
    CAST_OFFLINE,
    CAST_STATUS,
    CAST_IDLE,
    castOnline,
    castOffline,
    castStatus,
    castIdle
};
