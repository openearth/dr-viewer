export function getProjectConfig() {
  return require(process.env.CONFIG_DIR + "/" + "project.json");
}

export function importConfig(filePath) {
  return require(process.env.CONFIG_DIR + "/" + filePath);
}
