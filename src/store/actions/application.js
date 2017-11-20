const APPLICATION_LAUNCH = '[Application] Launch';
const APPLICATION_EXIT = '[Application] Exit';

const applicationLaunch = (device, application) => ({
    type: APPLICATION_LAUNCH,
    payload: {
        device,
        application
    }
});

const applicationExit = device => ({
    type: APPLICATION_EXIT,
    payload: device
});

module.exports = {
    APPLICATION_LAUNCH,
    APPLICATION_EXIT,
    applicationLaunch,
    applicationExit
};
