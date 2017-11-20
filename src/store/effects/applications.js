const { put, takeEvery, select } = require('redux-saga/effects');
const {
    CAST_STATUS,
    applicationLaunch,
    applicationExit,
    castIdle
} = require('../actions');

function* castStatus(action) {
    const { device } = action.payload;
    const { current, last } = yield select(state => state.applications[device]);

    if (!last && current) {
        if (current.isIdleScreen) {
            yield put(castIdle(device));
        }else {
            yield put(applicationLaunch(device, current));
        }
    }
    if (last && !current) {
        yield put(applicationExit(device));
    }
    if (last && current && last.appId !== current.appId) {
        yield put(applicationExit(device));
        if (current.isIdleScreen) {
            yield put(castIdle(device));
        }else {
            yield put(applicationLaunch(device, current));
        }
    }
}

function* applicationsSaga() {
    yield takeEvery(CAST_STATUS, castStatus);
}

module.exports = applicationsSaga;
