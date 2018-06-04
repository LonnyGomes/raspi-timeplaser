module.exports = {
    cronSchedule: '*/10 * * * * *',
    bucketName: 'lonnygomes-timelapse',
    bucketPrefix: 'tl-plant',
    credentials: {
        keyPath: 'certs/private.key',
        certPath: 'certs/cert.pem',
        caPath: 'certs/root-CA.crt'
    }
}