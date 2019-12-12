import { Big } from 'big.js'
import { toBig } from '../help/helpers'

export interface DecryptArgumentModel {
	encryptedString: string
	key: Big
	languageLength: number
	firstLetterCode: number
}

export const decrypt = (args: DecryptArgumentModel): string => {
	return args.encryptedString
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
}
