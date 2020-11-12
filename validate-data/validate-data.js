const process = require('process')
const path = require('path')
const fs = require('fs').promises
const chalk = require('chalk')
const JsonSchema = require('jsonschema')
const layerSchema = require('./schema-layer')
const layerGroupSchema = require('./schema-layer-group')
const config = require('../config')
const { resolve } = require('path')
const dataFolder = path.join(__dirname, '..', config.configDir, 'data')
const relativeDataFolder = path.relative(process.cwd(), dataFolder)

const log = console.log
const red = chalk.red
const error = chalk.bold.red
const yellow = chalk.yellow
const green = chalk.green

const validator = new JsonSchema.Validator()
const layerGroupsSchema = { type: 'array', items: { $ref: '/layer-group' } }

validator.addSchema(layerSchema, '/layer')
validator.addSchema(layerGroupSchema, '/layer-group')

async function validateFile(filePath) {
  const content = await fs.readFile(filePath, { encoding: 'utf-8' })
  const json = JSON.parse(content)
  return {
    filePath,
    file: validator.validate(json, layerGroupsSchema),
  }
}

function showError(object) {
  const relativePath = path.relative(process.cwd(), object.filePath)
  log()
  log(red(`./${relativePath}`))
  object.file.errors.forEach(error => log('- ', yellow(error.property), error.message))
  log()
}

const fileHasError = obj => obj.file.errors.length > 0

module.exports = async function() {
  log(`Validating JSON files in ${yellow(`./${relativeDataFolder}`)}`)
  const fileNames = await fs.readdir(dataFolder)
  const validatedFilePromises = fileNames
    .map(name => `${dataFolder}/${name}`)
    .map(validateFile)

  const results = await Promise.all(validatedFilePromises)
  const filesWithErrors = results.filter(fileHasError)
  
  if (filesWithErrors.length > 0) {
    log()
    log(`⚠️  There are some data files (in ${yellow(`./${relativeDataFolder}`)}) with errors (${filesWithErrors.length}):`)
    filesWithErrors.forEach(showError)
    process.exit(1);
  } else {
    log(`${green('✔')} JSON files are all ${green('valid')}`)
    log()
  }
}