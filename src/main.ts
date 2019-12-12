import { A, INPUT_ARRAY, LANGUAGE_SIZE, LETTER, P, POINT, P_ALICE, P_BOB, RSA_K, RSA_N } from './config'
import { decrypt } from './functions/cesar-algorithm'
import { phi } from './functions/euler-function'
import { getInverseNumber } from './functions/get-inverse-number-by-mod'
import { getMultiplicand } from './functions/get-multiplicand'
import { getOrder } from './functions/get-point-order'
import { multiply } from './functions/multiply-point-by-number'
import { ENGLISH_ALPHABET } from './help/english-codes'
import { toBig, toStringPoint } from './help/helpers'
import { ExistingPoint } from './help/model'

console.group('------ SIMPLE RSA -------')

const phiN = phi(RSA_N)
console.log(`phi(N) = ${+phiN}`)

const l = getInverseNumber(RSA_K, phiN)
console.log(`l * k === 1 (mod phi(N));`)
console.log(`l * ${+RSA_K} === 1 (mod ${+phiN});`)
console.log(`l = ${+l}`)

const inputList = INPUT_ARRAY.map(x => toBig(x))
const result = inputList
	.map(x => x.pow(+l).mod(RSA_N))
	.map(x => +x)
	.map(x => ENGLISH_ALPHABET[x])
	.join('')
console.log(`decrypted string: ${result}`)

console.groupEnd()

console.log('\n\n')

console.group('------ ELLIPTIC CURVES -------')

// --- 1 ---
const orderP = getOrder({ point: POINT, a: A, p: P })
console.log(`Order of point ${toStringPoint(POINT)} is`, orderP)

// --- 2 ---
const nAlice = getMultiplicand({ pointToMultiply: POINT, pointToCompare: P_ALICE, p: P, a: A })
const nBob = getMultiplicand({ pointToMultiply: POINT, pointToCompare: P_BOB, p: P, a: A })

console.log(`nAlice: ${nAlice.toString()}, nBob: ${nBob.toString()}`)

// --- 3 ---
const totalPoint = multiply({ point: P_ALICE, times: nBob.mod(P), a: A, p: P })
console.log(`Common point on curve ${toStringPoint(totalPoint)}`)

const k = (totalPoint as ExistingPoint).x.mod(LANGUAGE_SIZE)
console.log(`Cesar code shift: ${k.toString()}`)

const decryptedString = decrypt({
	encryptedString: LETTER,
	key: k,
	languageLength: LANGUAGE_SIZE,
	firstLetterCode: 'a'.charCodeAt(0),
})
console.log(`decrypted letter: '${decryptedString}'`)

// --- 4 ---

const size = phi(P)
console.log(`Number of points on curve = phi(N) = ${size.toString()}`)

console.groupEnd()
