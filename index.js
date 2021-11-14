#! /usr/bin/env node

const { program } = require('commander')

const configGeneratorFunctions = require('./lib/config-generator-functions')

program
  .option('-esl, --eslint-config', 'generate eslint config')
  .option('-tsc, --ts-config', 'generate tsconfig')
program.parse(process.argv)

const options = program.opts()

const run = async () => {
  const opts = Object.keys(options)

  for (let i = 0; i < opts.length; i += 1) {
    const currentOption = opts[i]
    const fnc = configGeneratorFunctions[currentOption]

    if (fnc) {
      // eslint-disable-next-line no-await-in-loop
      await fnc(options)
    }
  }

  console.log('Done 🎉')
}

run()
