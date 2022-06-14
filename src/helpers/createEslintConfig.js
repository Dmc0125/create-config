const fs = require('fs/promises')
const path = require('path')

const { runCommand } = require('./runCommand')

const createEslintConfig = async (ts, templatesFolderPath) => {
  console.log('🔔 Info: Installing eslint dependencies')

  await runCommand(
    'npm',
    ['i', '-D', 'eslint', 'eslint-config-airbnb-base', 'eslint-plugin-import'],
  )

  if (ts) {
    await runCommand(
      'npm',
      ['i', '-D', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'],
    )
  }

  console.log('🔔 Info: Creating configuration files')

  await fs.copyFile(
    path.join(`${templatesFolderPath}`, `./eslintrc.${ts ? 'ts' : 'js'}.js`),
    path.join(`${process.env.PWD}`, './.eslintrc.js'),
  )
}

module.exports = {
  createEslintConfig,
}
