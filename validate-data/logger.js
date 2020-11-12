const chalk = require('chalk')
const log  = console.log

module.exports = function logger(config) {
  if (config == undefined) return log()
  if (typeof config == 'string') return log(config)

  config.forEach((line) => {
    if (!line.length) {
      return log()
    }

    if (typeof line[0] === 'string') {
      const [color, message] = line;
      log(chalk[color](message));
    } else {
      log(line.map(([color, message]) => chalk[color](message)).join(''));
    }
  });
}