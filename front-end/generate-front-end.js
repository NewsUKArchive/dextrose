const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const pug = require("pug");
const logger = require("../lib/logger");

module.exports = (bucket, commitHash, opts) => {
  AWS.config.update({ region: opts.region });
  const s3 = new AWS.S3();
  s3.listObjects({ Bucket: bucket, Prefix: commitHash }, (err, data) => {
    const contents = data.Contents;
    const s3ImagesDetails = contents.map(details => {
      return `${s3.endpoint.href}${bucket}/${details.Key}`;
    });
    // Assumes dextrose output convention
    const webShots = s3ImagesDetails.filter(file => file.includes(".web.png"));
    const iosShots = s3ImagesDetails.filter(file => file.includes(".ios.png"));
    const androidShots = s3ImagesDetails.filter(file => file.includes(".android.png"));
    const shotNames = Array.from(
      new Set(files.map(f => f.replace(/(.ios|.web|.android).png/, "")))
    );
    const templatePath = path.join(__dirname, "template.pug");
    const compileTemplate = pug.compileFile(templatePath);

    const dextrosePresentation = compileTemplate({
      names: shotNames,
      ios_pics: iosShots,
      android_pics: androidShots,
      web_pics: webShots
    });

    fs.writeFile("index.html", dextrosePresentation, (err) => {
      if (err) {
        logger.error(err);
        return;
      }

      const pagePath = path.join(__dirname, "index.html");

      const fileStream = fs.createReadStream(pagePath);

      fileStream.on("error", (err) => {
        logger.error("File Error", err);
      });

      const uploadParams = {
        Bucket: bucket,
        Key: `${commitHash}/index.html`,
        Body: fileStream,
        ContentType: "text/html"
      };

      // call S3 to retrieve upload file to specified bucket
      s3.putObject(uploadParams, (err, data) => {
        if (err) {
          logger.error("Error", err);
        }
        if (data) {
          logger.info("Uploaded index.html successfully");
        }
      });
    });
  });
};
