const log = require("npmlog");


const setupLogger = () => {
  log.level = process.env.LOGLEVEL || "info";
  log.stream = process.stdout;
  log.enableColor();
  log.info("Dextrose Logger", `Log level is ${log.level}`);
}

const getDate = () => (new Date).toISOString().replace(/z|t/gi,' ').trim()

export default {
  info: (fileName, textToLog) => {
    log.stream = process.stdout;
    log.prefixStyle = { fg: "green", bg: "black" };
    log.info(`${getDate()} [${fileName}] :`, textToLog);
  },
  verbose: (fileName, textToLog) => {
    log.stream = process.stdout;
    log.prefixStyle = { fg: "blue" };
    log.verbose(`${getDate()} [${fileName}] :`, textToLog);
  },
  error: (fileName, textToError) => {
    log.stream = process.stderr;
    log.prefixStyle = { fg: "red" };
    log.error(`${getDate()} [${fileName}] :`, textToError);
  }
};

export { setupLogger }