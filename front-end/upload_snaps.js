const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const log = require('../lib/logger').default;

module.exports = (bucket, commitHash, snapPath, opts) => {
  log.info('upload snapshots', 'Uploading to S3');

  AWS.config.update({
    region: opts.region,
  });
  const s3 = new AWS.S3();
  const files = fs
    .readdirSync(snapPath)
    .map(f => `${path.join(process.cwd(), snapPath)}/${f}`);

  if(files.length === 0) {
    log.info('front-end', 'No snapshots found');
    return;
  }

  const key = commitHash || 'no-commit-hash';

  log.info('upload snapshots', `${files.length} images to be uploaded`);
  log.info('upload snapshots', `Images to be sent to bucket key: ${key}`);

  files.forEach((file) => {
    const fileStream = fs.createReadStream(file);

    fileStream.on('error', (err) => {
      log.error('upload snapshots', err);
    });

    const uploadParams = {
      Bucket: bucket,
      Key: `${key}/${path.basename(file)}`,
      Body: fileStream,
      ContentType: 'image/png',
    };

    // call S3 to retrieve upload file to specified bucket
    s3.putObject(uploadParams, (err, data) => {
      if (err) {
        log.error('upload snapshots', `${path.basename(file)} : ❌   Reason: ${err}`);
      }
      if (data) {
        log.info('upload snapshots', `${path.basename(file)} : ✅`);
      }
    });
  });
};
