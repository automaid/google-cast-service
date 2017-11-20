const EVENT_SETUP = '[Event] Setup';

const eventSetup = events => ({
    type: EVENT_SETUP,
    payload: events
});

module.exports = {
    EVENT_SETUP,
    eventSetup
};
