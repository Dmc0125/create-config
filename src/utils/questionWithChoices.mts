import { question, echo } from 'zx'

import { errorMessage } from './errorMessage.mjs'

export const questionWithChoices = async <T extends string[]>(_question: string, choices: T) => {
	const prompt = `${_question} (${choices.join('/')}) `
	let answer = await question(prompt)
	while (!choices.includes(answer)) {
		echo(errorMessage(`Invalid answer. Valid choices are: ${choices.join(', ')}`))
		answer = await question(prompt)
	}
	return answer as T[number]
}
