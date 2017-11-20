const MEDIA_STATUS = '[Media] Status';
const MEDIA_STATE_PLAYING = '[Media] State Playing';
const MEDIA_STATE_PAUSED = '[Media] State Paused';
const MEDIA_STATE_IDLE = '[Media] State Idle';
const MEDIA_STATE_BUFFERING = '[Media] State Buffering';
const MEDIA_METADATA = '[Media] Metadata';
const MEDIA_DURATION = '[Media] Duration';
const MEDIA_CURRENT_TIME = '[Media] Current Time';
const MEDIA_PLAYBACK_RATE = '[Media] Playback Rate';

const mediaStatus = (device, status) => ({
    type: MEDIA_STATUS,
    payload: {
        device,
        status
    }
});

const mediaState = (device, state) => ({
    type: state,
    payload: device
});

const mediaMetadata = (device, { images, title, albumName, albumArtist, artist }) => ({
    type: MEDIA_METADATA,
    payload: {
        device,
        metadata: {
            image: images[0].url,
            title,
            artist,
            album: {
                artist: albumArtist,
                name: albumName
            }
        }
    }
});

const mediaDuration = (device, duration) => ({
    type: MEDIA_DURATION,
    payload: {
        device,
        duration
    }
});

const mediaCurrentTime = (device, time) => ({
    type: MEDIA_CURRENT_TIME,
    payload: {
        device,
        time
    }
});

const mediaPlaybackRate = (device, rate) => ({
    type: MEDIA_PLAYBACK_RATE,
    payload: {
        device,
        rate
    }
});

module.exports = {
    MEDIA_STATUS,
    MEDIA_STATE_PLAYING,
    MEDIA_STATE_PAUSED,
    MEDIA_STATE_IDLE,
    MEDIA_STATE_BUFFERING,
    MEDIA_METADATA,
    MEDIA_DURATION,
    MEDIA_CURRENT_TIME,
    MEDIA_PLAYBACK_RATE,
    mediaStatus,
    mediaState,
    mediaMetadata,
    mediaDuration,
    mediaCurrentTime,
    mediaPlaybackRate
};
