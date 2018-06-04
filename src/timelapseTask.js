const State = require('./state');
const state = new State();

const bootstrap = (config) => {

    const createCam = (idx) => {
        const PiCamera = require('pi-camera');
        const myCamera = new PiCamera({
            mode: 'photo',
            output: `${ __dirname }/tl-${idx}.jpg`,
            nopreview: true,
        });

        return myCamera;
    }

    const task = async () => {
        const curIdx = await state.getCurIdx();
        console.log(`[*] creating time lapse image using index ${curIdx}`);

        try {
            // create instance of camera object
            const cam = createCam(curIdx);

            // take picture
            await cam.snap();

            console.log('[*] captured photo');

            // update index upon successful capture
            state.updateCurIdx();
        } catch (err) {
            console.error('Error while capturing photo', err);
        }

    }

    return task;
}

module.exports = bootstrap;

