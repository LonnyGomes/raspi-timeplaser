const State = require('./state');
const state = new State();

const bootstrap = (config) => {

    const task = async () => {
        const curIdx = await state.getCurIdx();
        console.log(`creating time lapse image using index ${curIdx}`);
        state.updateCurIdx();
    }

    return task;
}

module.exports = bootstrap;