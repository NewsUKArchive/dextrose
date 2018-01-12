const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
const log = require("../lib/logger").default;

module.exports = (bucket, commitHash, snapPath, opts) => {
  AWS.config.update({ region: opts.region });
  const s3 = new AWS.S3();
  const files = fs
    .readdirSync(snapPath)
    .map(f => `${path.join(process.cwd(), snapPath)}/${f}`);

  files.forEach( file => {
    const fileStream = fs.createReadStream(file);

    fileStream.on("error", (err) => {
      log.error("upload snapshots", err);
    });

    const uploadParams = {
      Bucket: bucket,
      Key: `${commitHash}/${path.basename(file)}`,
      Body: fileStream,
      ContentType: "image/png"
    };

    // call S3 to retrieve upload file to specified bucket
    s3.putObject(uploadParams, (err, data) => {

      if (err) {
        log.error("upload snapshots", err);
      }
      if (data) {
        log.info("upload snapshots", data.Location);
      }
    });
  });
};
