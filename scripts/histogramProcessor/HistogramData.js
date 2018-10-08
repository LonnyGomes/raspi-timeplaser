const fs = require('fs-extra');
const readline = require('readline');
const stream = require('stream');

class HistogramData {
    constructor(filepath) {
        this.filepath = filepath;
    }

    processFile() {
        const instream = fs.createReadStream(this.filepath);
        const outstream = new stream;
        const rl = readline.createInterface(instream, outstream);

        return new Promise((resolve, reject) => {
            const sums = { r: 0, g: 0, b: 0 };
            let count = 0;

            rl.on('line', (line) => {
                const curResult = this.processLine(line);
                sums.r += curResult.r;
                sums.g += curResult.g;
                sums.b += curResult.b;
                count += 1;
            });

            rl.on('error', (err) => reject(err));

            rl.on('close', (params) => {
                const averages = {
                    r: sums.r / count,
                    g: sums.g / count,
                    b: sums.b / count
                };

                const results = (averages.r + averages.g + averages.b) / 3;

                resolve(results);
            });
        });
    }

    processLine(line) {
        const re = /(\d+),\s*(\d+),\s*(\d+)/;
        const reResult = re.exec(line);

        if (reResult) {
            return {
                r: Number(reResult[1]) / 255,
                g: Number(reResult[2]) / 255,
                b: Number(reResult[3]) / 255
            }
        }

        return { r: 0, g: 0, b: 0 };
    }
}

module.exports = HistogramData;