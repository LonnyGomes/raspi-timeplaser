const State = require('./state');
const state = new State();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs-extra');
const path = require('path');

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

    const upload = (params) => {
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    }

    const task = async () => {
        const curIdx = await state.getCurIdx();
        console.log(`[*] creating time lapse image using index ${curIdx}`);

        try {
            // create instance of camera object
            const cam = createCam(curIdx);
            const outputFile = cam.config.output;
            const filename = path.basename(outputFile);

            // take picture
            await cam.snap();

            console.log(`[*] captured ${filename}`);

            // load photo in as a buffer
            const photoData = await fs.readFile(outputFile);

            console.log(`[*] uploading ${filename} ..`);
            await upload({
                Bucket: config.bucketName,
                Key: `${config.bucketPrefix}/${filename}`,
                Body: photoData
            });
            console.log(`[*] upload completed for ${filename}`);

            // remove image now that it is in s3
            await fs.remove(outputFile);

            // update index upon successful capture
            state.updateCurIdx();
        } catch (err) {
            console.error('Error while capturing photo', err);
        }

    }

    return task;
}

module.exports = bootstrap;

