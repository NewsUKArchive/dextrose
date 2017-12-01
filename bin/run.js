#!/usr/bin/env node

const program = require("commander");
const resolve = require('path').resolve
const dextrose = require("../index").default;
const logger = require("./logger");

program
  .version("0.0.1")
  .option("-c, --config [dextrose-config]", "A file that exports the dextrose config for your app")
  .option("-t, --snapshotWait [snapshot-wait]", "the amount of timeout to wait between loading a component and taking the snap", parseInt)
  .option("-T, --timeout [timeout]", "the timeout applied to appium before it closes the app", parseInt)
  .option("-l, --loglevel [log-level]")
  .parse(process.argv);

if (!program.config){
  logger.error("Please specify the dextrose config: --config [directory/config.js]");
  process.exit(1);
}

process.env.LOGLEVEL = program.loglevel ? program.loglevel : undefined;
logger.setupLogger();

const path = resolve(program.config);
const config = require(path);
config.snapshotWait = program.snapshotWait || 0;
config.newCommandTimeout = program.timeout || 600000;
dextrose(config);