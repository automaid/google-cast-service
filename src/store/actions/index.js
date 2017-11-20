const application = require('./application');
const cast = require('./cast');
const media = require('./media');
const volume = require('./volume');
const events = require('./events');

module.exports = Object.assign({}, cast, application, media, volume, events);
