const { Client, DefaultMediaReceiver } = require('castv2-client');
const mdns = require('mdns');
const logger = require('./logger');
const {
    castOnline,
    castOffline,
    castStatus,
    mediaStatus
} = require('./store/actions');

module.exports = ({ dispatch }) => {
    const connect = service => new Promise((resolve, reject) => {
        const client = new Client();

        const onConnect = () => {
            client.on('status', onStatus);
            client.getStatus((err, status) => {
                if (err) {
                    logger.error(err);
                    return;
                }
                onStatus(status);
            });
        };

        const onMedia = status => {
            dispatch(mediaStatus(service.name, status));
        };

        const onStatus = status => {
            dispatch(castStatus(service.name, status));

            if (status.applications) {
                client.join(status.applications[0], DefaultMediaReceiver, (err, app) => {
                    if (err) {
                        return logger.error(err);
                    }

                    app.getStatus((err, appStatus) => {
                        if (err) {
                            return logger.error(err);
                        }
                        appStatus && onMedia(appStatus);
                    });
                    setInterval(() => {
                        app.getStatus((err, appStatus) => {
                            if (err) {
                                return logger.error(err);
                            }
                            appStatus && onMedia(appStatus);
                        });
                    }, 1000);
                    app.on('status', appStatus => onMedia(appStatus));
                    logger.trace(app, 'Running Application');
                });
            }
        };

        client.connect(service.addresses[0], onConnect);

        client.on('error', err => reject(err));
    });

    const setup = () => {
        const resolverSequence = [
            mdns.rst.DNSServiceResolve(),          // eslint-disable-line new-cap
            'DNSServiceGetAddrInfo' in mdns.dns_sd ?
                mdns.rst.DNSServiceGetAddrInfo() : // eslint-disable-line new-cap
                mdns.rst.getaddrinfo({ families: [4] }),
            mdns.rst.makeAddressesUnique()
        ];
        const browser = mdns.createBrowser(mdns.tcp('googlecast'), {
            resolverSequence
        });
        browser.on('serviceUp', service => {
            logger.debug({ service }, `Found ${service.txtRecord.fn}`);
            dispatch(castOnline(service));
            connect(service);
        });
        browser.on('serviceDown', service => {
            dispatch(castOffline(service));
        });
        browser.start();
    };

    setup();
};
