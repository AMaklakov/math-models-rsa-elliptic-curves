import { Big } from 'big.js'
import { ENGLISH_ALPHABET } from './util/english-codes'
import { calcEulerFunction, getInverseNumber, toBig } from './util/math-over-module'

export const hackRSA = ({ n, k, codesToTranslate }: { n: Big; k: Big; codesToTranslate: number[] }) => {
	console.log('------ SIMPLE RSA -------')

	const phiN = calcEulerFunction(n)
	console.log(`phi(N) = ${+phiN}`)

	const l = getInverseNumber(k, phiN)
	console.log(`l * k === 1 (mod phi(N));`)
	console.log(`l * ${+k} === 1 (mod ${+phiN});`)
	console.log(`l = ${+l}`)

	const decrypted = codesToTranslate
		.map(x => toBig(x))
		.map(x => x.pow(+l).mod(n))
		.map(x => +x)
		.map(x => ENGLISH_ALPHABET[x])
		.join('')
	console.log(`decrypted string: ${decrypted}`)
	return decrypted
}
