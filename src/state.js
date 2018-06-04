const fs = require('fs-extra');
const path = require('path');
const STATE_CONF_PATH = path.resolve(__dirname, '..', 'state.json');
const initialState = {
    idx: 1
};

class State {
    _loadState() {
        return new Promise(async (resolve, reject) => {
            let state = null;

            try {
                const exists = await fs.pathExists(STATE_CONF_PATH);

                if (exists) {
                    state = await fs.readJson(STATE_CONF_PATH);
                } else {
                    state = initialState;
                }

                resolve(state);
            } catch (err) {
                console.log('Error:', err);
                reject(err);
            }
        });
    }

    getCurIdx() {
        return new Promise(async (resolve, reject) => {

            try {
                const curState = await this._loadState();

                resolve(curState.idx);
            } catch (err) {
                reject(err);
            }
        });
    }

    async updateCurIdx() {
        try {
            let curState = await this._loadState();
            curState.idx += 1;
            await fs.writeJson(STATE_CONF_PATH, curState);
        } catch (err) {
            console.log('Error occurred while updating', err);
        }
    }
}

module.exports = State;