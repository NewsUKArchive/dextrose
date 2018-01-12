const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
const logger = require("../lib/logger");

module.exports = (bucket, commitHash, snapPath, opts) => {
  AWS.config.update({ region: opts.region });
  const s3 = new AWS.S3();
  const files = fs
    .readdirSync(snapPath)
    .map(f => `${path.join(__dirname, snapPath)}/${f}`);

  files.forEach( file => {
    const fileStream = fs.createReadStream(files[file]);

    fileStream.on("error", (err) => {
      logger.error("File Error", err);
    });

    const uploadParams = {
      Bucket: bucket,
      Key: `${commitHash}/${path.basename(files[file])}`,
      Body: fileStream,
      ContentType: "image/png"
    };

    // call S3 to retrieve upload file to specified bucket
    s3.putObject(uploadParams, (err, data) => {
      if (err) {
        logger.error("Error", err);
      }
      if (data) {
        logger.info("Upload Success", data.Location);
      }
    });
  });
};
