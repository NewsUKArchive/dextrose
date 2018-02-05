const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const pug = require("pug");
const log = require("../lib/logger").default;

module.exports = (bucket, commitHash, opts) => {
  AWS.config.update({ region: opts.region });
  const s3 = new AWS.S3();

  s3.listObjects({ Bucket: bucket, Prefix: commitHash }, (err, data) => {
    const names = []
    const shots = data.Contents.reduce( (collection, details) => {
      const url = `${s3.endpoint.href}${bucket}/${details.Key}`;
      
      if (!url.includes(".png")) {
        return collection;
      }

      const storyDetails = url.match(/dextrose-test\/(.*)\.(.*)\.png/);
      const storyName = storyDetails[1];
      const platform = storyDetails[2];

      if (!collection[storyName]) {
        names.push(storyName);
        collection[storyName] = {};
      }

      collection[storyName][platform] = url;

      return collection;
    } ,{});

    const templatePath = path.join(__dirname, "template.pug");
    const compileTemplate = pug.compileFile(templatePath);


    const dextrosePresentation = compileTemplate({
      names: names,
      shots: shots
    });

    const pagePath = path.join(__dirname, "index.html");

    fs.writeFile(pagePath, dextrosePresentation, (err) => {
      if (err) {
        log.error("generate-front-end", err);
        return;
      }
      
      const fileStream = fs.createReadStream(pagePath);

      fileStream.on("error", (err) => {
        log.error("generate-front-end", err);
      });

      const uploadParams = {
        Bucket: bucket,
        Key: `${commitHash}/index.html`,
        Body: fileStream,
        ContentType: "text/html"
      };

      s3.putObject(uploadParams, (err, data) => {
        if (err) {
          log.error("generate-front-end", err);
        }
        if (data) {
          log.info("generate-front-end", "Uploaded index.html successfully");
        }
      });
    });
  });
};
