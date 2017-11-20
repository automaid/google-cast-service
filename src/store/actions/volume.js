const VOLUME_CHANGE = '[Volume] Change';
const VOLUME_MUTE = '[Volume] Mute';
const VOLUME_UNMUTE = '[Volume] Unmute';

const volumeChange = (device, volume) => ({
    type: VOLUME_CHANGE,
    payload: {
        device,
        volume
    }
});

const volumeMute = device => ({
    type: VOLUME_MUTE,
    payload: device
});

const volumeUnmute = device => ({
    type: VOLUME_UNMUTE,
    payload: device
});

module.exports = {
    VOLUME_CHANGE,
    VOLUME_MUTE,
    VOLUME_UNMUTE,
    volumeChange,
    volumeMute,
    volumeUnmute
};
