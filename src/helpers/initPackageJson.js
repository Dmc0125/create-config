const { runCommand } = require('./runCommand')

const initPackageJson = async () => {
  await runCommand('npm', ['init', '-y'])
}

module.exports = {
  initPackageJson,
}
