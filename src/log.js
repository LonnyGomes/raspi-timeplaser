const chalk = require('chalk');
require('./monkey-patches');

const INFO_BUL = `${chalk.green('[*]')}`;
const ERROR_BUL = `${chalk.red('[*]')}`;
const ARROW = `${chalk.magenta('↳')}`;

const genTimestamp = () => {
    const d = new Date();

    // generate date section of timestamp
    const dateStr = `${(d.getMonth() + 1).pad()}/${d.getDate().pad()}`;
    // generate time section of timestamp
    const timeStr =
        `${d.getHours().pad()}:${d.getMinutes().pad()}:${d.getSeconds().pad()}`;

    const timestamp = chalk.cyan(`[${dateStr} ${timeStr}]`);

    return timestamp;
}

const header = (str) => {
    const timestamp = genTimestamp();
    console.log(`${timestamp} ${INFO_BUL} ${chalk.white(str)}`);
}

const info = (str) => {
    const timestamp = genTimestamp();
    console.log(`${timestamp} ${INFO_BUL} ${ARROW}  ${chalk.white(str)}`);
}

const error = (str) => {
    const timestamp = genTimestamp();
    console.log(`${timestamp} ${ERROR_BUL} ${chalk.gray(str)}`);
}

module.exports = {
    header,
    info,
    error
}
