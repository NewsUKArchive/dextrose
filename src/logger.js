const log = require('npmlog');

const setupLogger = (logLevel) => {
  log.level = logLevel || 'info';
  log.stream = process.stdout;
  log.enableColor();
  log.info('Dextrose Logger', `Log level is ${log.level}`);
};

export default {
  info: (fileName, textToLog) => {
    log.stream = process.stdout;
    log.prefixStyle = { fg: 'green', bg: 'black' };
    log.info(`[${fileName}] :`, textToLog);
  },
  verbose: (fileName, textToLog) => {
    log.stream = process.stdout;
    log.prefixStyle = { fg: 'blue' };
    log.verbose(`[${fileName}] :`, textToLog);
  },
  error: (fileName, textToError) => {
    log.stream = process.stderr;
    log.prefixStyle = { fg: 'red' };
    log.error(`[${fileName}] :`, textToError);
  },
};

export { setupLogger };
