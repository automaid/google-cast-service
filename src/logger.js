const { createLogger, stdSerializers } = require('bunyan');
const formatter = require('bunyan-format');

const logger = createLogger({
    name: 'cast-service',
    stream: formatter({
        outputMode: 'short'
    }),
    serializers: Object.assign({}, stdSerializers, {
        service: service => ({
            name: service.name,
            interface: service.networkInterface,
            port: service.port,
            addresses: service.addresses
        })
    })
});

module.exports = logger;
