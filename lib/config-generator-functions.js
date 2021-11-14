const fs = require('fs/promises')
const path = require('path')

const eslintConfigs = require('../templates/eslintrc.json')
const runCommand = require('./run-command')

const createAndWriteEslintConfig = async (content) => {
  await fs.writeFile('./.eslintrc.js', content)
}

const configGeneratorFunctions = {
  eslintConfig: async (options) => {
    console.log('Installing and configuring eslint')
    await runCommand('npm', ['i', '-D', 'eslint', 'eslint-config-airbnb-base', 'eslint-plugin-import'])

    if (!options.tsConfig) {
      try {
        await createAndWriteEslintConfig(eslintConfigs.js)
      } catch (error) {
        console.log(error)
      }
      return
    }

    console.log('Installing and configuring typescript eslint')

    await runCommand('npm', ['i', '-D', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'])

    try {
      await createAndWriteEslintConfig(eslintConfigs.ts)
    } catch (error) {
      console.log(error)
    }
  },
  tsConfig: async () => {
    console.log('Installing and configuring typescript')
    await runCommand('cp', ['-rf', path.join(__dirname, '../templates/tsconfig.json'), '.'])
    await runCommand('npm', ['i', '-D', '@types/node', 'typescript'])
  },
}

module.exports = configGeneratorFunctions
