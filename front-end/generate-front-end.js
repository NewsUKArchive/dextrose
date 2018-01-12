const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const pug = require("pug");

module.exports = (bucket, commitHash, opts) => {
  AWS.config.update({ region: opts.region });
  const s3 = new AWS.S3();
  s3.listObjects({ Bucket: bucket, Prefix: commitHash }, (err, data) => {
    const contents = data.Contents;
    const files = contents.map(obj => {
      return `${s3.endpoint.href}${bucket}/${obj.Key}`;
    });
    // Assumes dextrose output convention
    const web_photos = files.filter(file => file.includes(".web.png"));
    const ios_photos = files.filter(file => file.includes(".ios.png"));
    const android_photos = files.filter(file => file.includes(".android.png"));
    const names = Array.from(
      new Set(files.map(f => f.replace(/(.ios|.web|.android).png/, "")))
    );
    const templatePath = path.join(__dirname, "template.pug");
    const compileTemplate = pug.compileFile(templatePath);

    const dextrosePresentation = compileTemplate({
      names: Array.from(names),
      ios_pics: ios_photos,
      android_pics: android_photos,
      web_pics: web_photos
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
