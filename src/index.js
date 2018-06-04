const cron = require('node-cron');
const log = require('./log');
const config = require('../config');
const task = require('./timelapseTask')(config);

// confirm cron job task is properly defined
cron.validate(config.cronSchedule);

if (!cron.validate(config.cronSchedule)) {
    log.error('Invalid cron schedule defined!');
    process.exit(-1);
}

log.info('starting time lapse scheduler ...');
cron.schedule(config.cronSchedule, task);
