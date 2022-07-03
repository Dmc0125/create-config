const fs = require('fs/promises')
const path = require('path')

const { runCommand } = require('./runCommand')

const pkgFilePath = path.join(process.env.PWD, './package.json')

const readPkgFile = async () => {
  const pkg = await fs.readFile(pkgFilePath, { encoding: 'utf-8' })
  return JSON.parse(pkg)
}

const writePkgFile = async (pkg) => (
  fs.writeFile(pkgFilePath, JSON.stringify(pkg, null, '  '))
)

const initPackageJson = async () => {
  await runCommand('npm', ['init', '-y'])

  const pkgConfig = await readPkgFile()
  await writePkgFile({
    ...pkgConfig,
    scripts: {
      ...(pkgConfig.scripts || []),
      build: 'tsc',
      'build:watch': 'tsc -w',
      start: 'node dist/index.js',
      dev: 'nodemon dist/index.js',
    },
  })
}

module.exports = {
  initPackageJson,
}
