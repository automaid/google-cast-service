const { NotFoundError } = require('restify-errors');

module.exports = (server, { getState }) => {
    const getDevices = (req, res, next) => {
        const { devices } = getState();
        let ids = Object.getOwnPropertyNames(devices);
        if (typeof req.query.idle !== 'undefined') {
            if (req.query.idle === 'false') {
                ids = ids.filter(id => !devices[id].idle);
            }
        }
        req.devices = ids.map(id => devices[id]);
        next();
    };

    const getDevice = (req, res, next) => {
        const state = getState();
        const device = state.devices[req.params.device];
        if (typeof device !== 'undefined') {
            req.device = device;
            return next();
        }
        return next(new NotFoundError(`Device ${req.params.device} is not available`));
    };

    server.get('/devices', getDevices, (req, res) => {
        res.status(200);
        res.json(req.devices);
        res.end();
    });

    server.get('/devices/:device', getDevice, (req, res) => {
        res.status(200);
        res.json(req.device);
        res.end();
    });

    server.get('/devices/:device/application', getDevice, (req, res) => {
        const { application } = req.device;
        if (application) {
            res.status(200);
            res.json(application);
            return res.end();
        }
        res.status(204);
        res.end();
    });

    server.get('/devices/:device/media', getDevice, (req, res) => {
        const { media } = req.device;
        if (media) {
            res.status(200);
            res.json(media);
            return res.end();
        }
        res.status(204);
        res.end();
    });
};
