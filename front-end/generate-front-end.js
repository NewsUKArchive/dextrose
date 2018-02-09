const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const pug = require('pug');
const log = require('../lib/logger').default;

module.exports = (bucket, commitHash, opts) => {
  AWS.config.update({ region: opts.region });
  const s3 = new AWS.S3();

  s3.listObjects({ Bucket: bucket, Prefix: commitHash }, (s3Error, s3Data) => {
    const names = [];
    const shots = s3Data.Contents.reduce((collection, details) => {
      const url = `${s3.endpoint.href}${bucket}/${details.Key}`;

      if (!url.includes('.png')) {
        return collection;
      }

      const storyDetails = url.match(/dextrose-test\/(.*)\.(.*)\.png/);
      const storyName = storyDetails[1];
      const platform = storyDetails[2];

      if (!collection[storyName]) {
        names.push(storyName);
        collection[storyName] = {}; // eslint-disable-line no-param-reassign
      }

      collection[storyName][platform] = url; // eslint-disable-line no-param-reassign

      return collection;
    }, {});

    const templatePath = path.join(__dirname, 'template.pug');
    const compileTemplate = pug.compileFile(templatePath);

    const dextrosePresentation = compileTemplate({
      names,
      shots,
    });

    const pagePath = path.join(__dirname, 'index.html');

    fs.writeFile(pagePath, dextrosePresentation, (writeErr) => {
      if (writeErr) {
        log.error('generate-front-end', writeErr);
        return;
      }

      const fileStream = fs.createReadStream(pagePath);

      fileStream.on('error', (streamErr) => {
        log.error('generate-front-end', streamErr);
      });

      const uploadParams = {
        Bucket: bucket,
        Key: `${commitHash}/index.html`,
        Body: fileStream,
        ContentType: 'text/html',
      };

      s3.putObject(uploadParams, (uploadErr, uploadData) => {
        if (uploadErr) {
          log.error('generate-front-end', uploadErr);
        }
        if (uploadData) {
          log.info('generate-front-end', 'Uploaded index.html successfully');
        }
      });
    });
  });
};
