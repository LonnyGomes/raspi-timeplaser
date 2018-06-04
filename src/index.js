const cron = require('node-cron');
const config = require('../config');
const task = require('./timelapseTask')();

// confirm cron job task is properly defined
cron.validate(config.cronSchedule);

if (!cron.validate(config.cronSchedule)) {
    console.error('Invalid cron schedule defined!');
    process.exit(-1);
}

console.log('starting time lapse ...');
cron.schedule(config.cronSchedule, task);
