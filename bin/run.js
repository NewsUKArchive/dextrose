#!/usr/bin/env node
const program = require("commander");
const dextrose = require("../index").default;

program
  .version("0.0.1")
  .option("-c, --config [dextrose-config]", "please specify the dextrose config")
  .parse(process.argv);


if (!program.config)
  throw new Error(
    "Please specify the dextrose config: --config [directory/config.js]"
  );
  const config = require(program.config)
  dextrose(config);

