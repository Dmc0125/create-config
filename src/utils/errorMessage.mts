import { chalk } from 'zx'

export const errorMessage = (msg: string) => `${chalk.bgRed(' Error: ')}${chalk.red(msg)}`
