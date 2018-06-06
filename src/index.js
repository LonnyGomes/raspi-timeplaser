const schedule = require('node-schedule');
const log = require('./log');
const config = require('../config');
const task = require('./timelapseTask')(config);


log.header('starting time lapse scheduler ...');
schedule.scheduleJob(config.cronSchedule, task);
