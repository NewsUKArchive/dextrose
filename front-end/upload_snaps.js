var fs = require('fs');
var AWS = require('aws-sdk');
var path = require('path');

module.exports = (bucket, commitHash, snapPath, opts) => {
  AWS.config.update({region: opts.region});
  const s3 = new AWS.S3();
  const files = fs.readdirSync(snapPath).map(f => `${path.join(__dirname, snapPath)}/${f}`);

  for (file in files) {
      const fileStream = fs.createReadStream(files[file]);

      fileStream.on('error', function(err) {
        console.log('File Error', err);
      });

      const uploadParams = {
        Bucket: bucket, 
        Key: `${commitHash}/${path.basename(files[file])}`, 
        Body: fileStream, 
        ContentType: 'image/png'
      };

      // call S3 to retrieve upload file to specified bucket
      s3.putObject (uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } if (data) {
          console.log("Upload Success", data.Location);
        }
      });
  }
}