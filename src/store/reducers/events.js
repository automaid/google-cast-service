const {
    EVENT_SETUP
} = require('../actions');

const reduce = (state = {}, action) => {
    switch (action.type) {
        case EVENT_SETUP: {
            const res = {};
            Object.getOwnPropertyNames(action.payload.devices)
                .forEach(name => {
                    const device = {};
                    action.payload.devices[name].forEach(({ applications, urls, events }) => {
                        const meta = {
                            applications,
                            urls
                        };
                        events.forEach(type => {
                            if (device.hasOwnProperty(type)) {
                                device[type].push(meta);
                            }else {
                                device[type] = [meta];
                            }
                        });
                    });
                    res[name] = device;
                });
            return res;
        }
        default:
            return state;
    }
};

module.exports = reduce;
