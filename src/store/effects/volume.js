const { put, takeEvery, select } = require('redux-saga/effects');
const {
    CAST_STATUS,
    volumeChange,
    volumeMute,
    volumeUnmute
} = require('../actions');

function* castStatus(action) {
    const { device } = action.payload;
    const { current, last } = yield select(state => state.volume[device]);

    if (!last || current.level !== last.level) {
        yield put(volumeChange(device, current.level));
    }
    if (!last || current.muted !== last.muted) {
        yield put(current.muted ? volumeMute(device) : volumeUnmute(device));
    }
}

function* volumeSaga() {
    yield takeEvery(CAST_STATUS, castStatus);
}

module.exports = volumeSaga;
