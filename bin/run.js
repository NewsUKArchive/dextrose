#!/usr/bin/env node
const program = require("commander");
const dextrose = require("../index").default;
const resolve = require('path').resolve
const setupLogger = require('../lib/logger').setupLogger

program
  .version("0.0.1")
  .option("-c, --config [dextrose-config]", "please specify the dextrose config")
  .option("-l, --loglevel [log-level]")
  .parse(process.argv);


if (!program.config)
  throw new Error(
    "Please specify the dextrose config: --config [directory/config.js]"
  );

  process.env.LOGLEVEL = program.loglevel ? program.loglevel : '';
  setupLogger();

  const path = resolve(program.config);
  const config = require(path);
  dextrose(config);

