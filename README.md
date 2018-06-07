# raspi-timeplaser
NodeJS app to take long-term time lapses with a raspberry pi camera and upload to s3

## Prerequisites

This time lapse server is meant to be run on a raspberry pi with a connected raspberry pi camera

- AWS account configured with a key id and access key
- raspistill command line utility
- NodeJS


## Usage

Install the aws cli and configure your AWS credentials. Next update the `config.js` file to change the the `cronSchedule`, `bucketName`, and `bucketPrefix`.

To start the service run the following to start the time lapse:

```bash
npm start
```

### PM2 Usage

To start the service using pm2 install it globally and use the config file.

```bash
npm install -g pm2
pm2 start pm2.config.js
```