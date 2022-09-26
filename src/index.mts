#!/usr/bin/env zx

import { $, cd, chalk, echo, question, within } from 'zx'
import * as fs from 'fs/promises'
import * as path from 'path'

import { errorMessage } from './utils/errorMessage.mjs'
import { questionWithChoices } from './utils/questionWithChoices.mjs'

const projectName = await question('Project name: ')

if (!projectName.match(/^([0-9a-z-_.])+$/) || projectName.length < 2) {
	echo(
		errorMessage(
			' Project name must be at least 2 characters long can only have these characters: ' +
				'0-9, a-z, ., -, _',
		),
	)
	process.exit(1)
}

const pwd = process.cwd()

// CREATE DIRECTORIES
await fs.mkdir(path.join(pwd, `./${projectName}`))

await fs.mkdir(path.join(pwd, `./${projectName}/src`))
await fs.writeFile(path.join(pwd, `./${projectName}/src/index.ts`), '')

// COPY tsconfig.json, .eslintrc.js, .prettierrc
const copyConfigFile = async (fileName: '.eslintrc.js' | 'tsconfig.json' | '.prettierrc') =>
	fs.copyFile(
		path.join(__dirname, `../templates/${fileName}`),
		path.join(pwd, `./${projectName}/${fileName}`),
	)

await Promise.all([
	copyConfigFile('.eslintrc.js'),
	copyConfigFile('tsconfig.json'),
	copyConfigFile('.prettierrc'),
])

// CREATE package.json
await within(async () => {
	echo(`\n${chalk.blueBright('Creating package.json...')}`)

	const unsetPackageJsonStr = await fs.readFile(path.join(__dirname, '../templates/package.json'), {
		encoding: 'utf-8',
	})

	const appDescription = await question('  App description: ')
	const appAuthor = await question('  App author: ')
	const appType = await questionWithChoices('  App type: ', ['commonjs', 'module'])

	const packageJsonStr = unsetPackageJsonStr
		.replace('<app-name>', projectName)
		.replace('<app-description>', appDescription)
		.replace('<app-author>', appAuthor)
		.replace('<app-type>', appType)

	await fs.writeFile(path.join(pwd, `./${projectName}/package.json`), packageJsonStr)
})

cd(`./${projectName}`)

// SET license
await within(async () => {
	const setLicense = await questionWithChoices(chalk.blueBright('\nDo you wish to set license?'), [
		'yes',
		'y',
		'no',
		'n',
	])
	if (setLicense === 'yes' || setLicense === 'y') {
		const licenseType = await question('Which license? ')
		await $`npx license ${licenseType.toUpperCase()}`
	}
})

// INSTALL DEPENDENCIES

const packageManager = await questionWithChoices(chalk.blueBright('Package manager:'), [
	'pnpm',
	'npm',
])
try {
	await $`${packageManager} i -D typescript nodemon`
} catch (error) {
	echo(errorMessage('Pnpm install error'))
	echo(error)
}

// Initialize github
await within(async () => {
	const initGit = await questionWithChoices(chalk.blueBright('Init git?'), ['yes', 'y', 'no', 'n'])
	if (initGit === 'yes' || initGit === 'y') {
		await fs.writeFile(path.join(pwd, `./${projectName}/.gitignore`), 'node_modules\n.env\ndist')

		$`git init && git add . && git commit -m 'Initial commit' && git branch -M main`
	}
})
