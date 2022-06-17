#! /usr/bin/env node
const { program } = require('commander')
const path = require('path')

const { createEslintConfig } = require('./helpers/createEslintConfig')
const { createTsConfig } = require('./helpers/createTsConfig')
const { initPackageJson } = require('./helpers/initPackageJson')

const templatesFolderPath = path.join(__dirname, '../templates')
const args = [
  {
    short: '-pkg',
    long: '--create-pkg',
    description: 'Inits package.json',
  },
  {
    short: '-tsc',
    long: '--ts-config',
    description: 'Installs Typescript, @types/node and generates TS config and typescript'
      + 'ESLint config',
  },
]

args.forEach(({ short, long, description }) => {
  program.option(`${short}, ${long}`, description)
})
program.parse(process.argv)

const options = program.opts()

const run = async () => {
  if (options.createPkg) {
    await initPackageJson()
  }

  await createEslintConfig(args.tsConfig, templatesFolderPath)

  if (options.tsConfig) {
    createTsConfig(templatesFolderPath)
  }

  console.log(
    `🎉 Done. Successfully installed and configured ESLint${
      options.tsConfig ? ' and typescript.' : ''
    }`,
  )
}

run()
