import { Big } from 'big.js'
import { toBig } from './util/math-over-module'

export const decryptCesarCode = (args: {
	encryptedString: string
	key: Big
	languageLength: number
	firstLetterCode: number
}): string =>
	args.encryptedString
		.split('')
		.map(char => {
			const code = char.charCodeAt(0) - args.firstLetterCode

			let newCode = +toBig(code)
				.minus(args.key)
				.mod(args.languageLength)

			if (newCode < 0) {
				newCode += args.languageLength
			}

			return String.fromCharCode(args.firstLetterCode + newCode)
		})
		.join('')
