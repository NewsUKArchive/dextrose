#!/usr/bin/env node

const program = require('commander');
const { resolve } = require('path');
const { dextrose } = require('../index');
const logger = require('../lib/logger');
const uploadSnaps = require('../front-end/upload_snaps');
const generateHtml = require('../front-end/generate-front-end');
const { cleanDextroseStories, generateStories } = require('./generate-stories');

const log = logger.default;
const loglevel = program.loglevel ? program.loglevel : 'info';
logger.setupLogger(loglevel);

program
  .version('0.0.1')
  .command('run')
  .alias('r')
  .option('-c, --config [dextrose-config]', 'A file that exports the dextrose config for your app')
  .option('-t, --snapshotWait [snapshot-wait]', 'the amount of timeout to wait between loading a component and taking the snap', parseInt)
  .option('-T, --timeout [timeout]', 'the timeout applied to appium before it closes the app', parseInt)
  .option('-l, --loglevel [log-level]')
  .action((options) => {
    if (!options.config) {
      log.error('run', 'Please specify the dextrose config: --config [directory/config.js]');
      process.exit(1);
    }
    const path = resolve(options.config);
    const config = require(path);
    config.snapshotWait = options.snapshotWait || 0;
    config.newCommandTimeout = options.timeout || 600000;
    dextrose(config);
  });

program
  .command('upload-snaps [path]')
  .alias('u')
  .option('-b, --bucket [bucket name]', 'the name of the s3 bucket')
  .option('-k, --key [bucket name]', 'the name of the key in the bucket')
  .option('-r, --region [aws-region]', 'the aws region of your bucket')
  .action((path, options) => {
    const { bucket, key, region } = options;

    if (!bucket) log.error('upload-snaps', 'bucket must be defined, use -b');
    if (!key) log.error('upload-snaps', 'key must be defined, use -k');
    if (!path) log.error('upload-snaps', 'path must be defined');
    if (!path || !key || !bucket) process.exit(1);
    uploadSnaps(bucket, key, path, { region });
  });
program
  .command('generate-html')
  .alias('g')
  .option('-u, --upload', 'using this will attempt to upload the html file to s3')
  .option('-d, --dir [dir]', 'the directory to save the file to')
  .option('-b, --bucket [bucket name]', 'the name of the s3 bucket')
  .option('-k, --key [bucket name]', 'the name of the key in the bucket')
  .option('-r, --region [aws-region]', 'the aws region of your bucket')
  .action((options) => {
    const { bucket, key, region } = options;

    if (options.upload) {
      if (!bucket) log.error('generate-html', 's3 bucket must be defined, use -b');
      if (!key) log.error('generate-html', 'bucket key must be defined, use -k');
      if (!region) log.error('generate-html', 'aws region must be defined, use -r');
      if (!key || !bucket || !region) process.exit(1);
      generateHtml(bucket, key, { region });
    } else if (!options.dir) {
      log.error('generate-html', 'path to save to must be defined, -d');
      process.exit(1);
    }
  });

program
  .command('generate-stories [dirPath]')
  .alias('gs')
  .action((dirPath) => {
    if (!dirPath) log.error('run', 'no directory path found ');

    log.info('run', 'Generating Dextrose stories');
    generateStories(dirPath)
      .then(() => {
        log.info('run', 'Dextrose stories generated');
      })
      .catch(err => log.error(err));
  });

program
  .command('clean-stories [path]')
  .alias('cs')
  .action((dirPath) => {
    if (!dirPath) log.error('run', 'no directory path found ');

    log.info('run', 'cleaning Dextrose stories');
    cleanDextroseStories(dirPath);
  });


program.parse(process.argv);
