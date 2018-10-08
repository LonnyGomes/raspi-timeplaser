const fs = require('fs-extra');
const path = require('path');
const HistogramData = require('./HistogramData');

const getHistogramFiles = async (basePath) => {
    let files = null;
    try {
        files = await fs.readdir(path.resolve(basePath));
    } catch (error) {
        console.error('could not open directory');
        process.exit(3);
    }

    // re-map files to include full path
    files = files.map((curFile) => path.resolve(basePath, curFile));

    return files;
}

const init = async (basePath) => {
    const files = await getHistogramFiles(basePath);

    files.forEach(async (curFile) => {
        const histogramData = new HistogramData(curFile);
        const curResults = await histogramData.processFile();

        if (curResults <= 0.2) {
            console.log(`${path.basename(curFile)}: ${Math.round(curResults * 100)}%`);
        }
    });
};

if (process.argv.length != 3) {
    console.error('supply base path');
    process.exit(2);
}

init(process.argv[2]);