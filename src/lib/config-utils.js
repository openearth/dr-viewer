export const config = require('../../config')

export function importConfig(filePath) {
  return require(process.env.CONFIG_DIR + "/" + filePath);
}
