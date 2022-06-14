const path = require('path')
const fs = require('fs/promises')

const { runCommand } = require('./runCommand')

const createTsConfig = async (templatesFolderPath) => {
  console.log('🔔 Info: 🎈 Almost done. Installing typescript dependencies')
  await runCommand('npm', ['i', '-D', '@types/node', 'typescript'])

  console.log('🔔 Info: Creating typescript config files')
  await fs.copyFile(
    path.join(templatesFolderPath, './tsconfig.json'),
    path.join(process.env.PWD, './tsconfig.json'),
  )
}

module.exports = {
  createTsConfig,
}
