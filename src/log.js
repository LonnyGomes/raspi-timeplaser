const chalk = require('chalk');

const INFO_BUL = `${chalk.green('[*]')}`;
const ERROR_BUL = `${chalk.red('[*]')}`;

const info = (str) => {
    console.log(`${INFO_BUL} ${chalk.white(str)}`);
}
const error = (str) => {
    console.log(`${ERROR_BUL} ${chalk.gray(str)}`);
}


module.exports = {
    info,
    error
}