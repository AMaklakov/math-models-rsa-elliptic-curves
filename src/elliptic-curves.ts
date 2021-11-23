import { ExistingPoint, getMultiplicand, getPointOrder, multiply2Points, Point, toStringPoint } from './util/points'
import { Big } from 'big.js'
import { calcEulerFunction } from './util/math-over-module'
import { decryptCesarCode } from './cesar-code'

interface IArguments {
	point: Point
	a: Big
	p: Big
	alicePoint: Point
	bobPoint: Point
	langSize: number
	letter: string
}

export const solveEllipticCurves = ({ point, a, p, alicePoint, bobPoint, langSize, letter }: IArguments) => {
	console.group('\n\n------ ELLIPTIC CURVES -------')

	// --- 1 ---
	const orderP = getPointOrder({ point, a, p })
	console.log(`Order of point ${toStringPoint(point)} is`, orderP)

	// --- 2 ---
	const nAlice = getMultiplicand({ pointToMultiply: point, pointToCompare: alicePoint, p, a })
	const nBob = getMultiplicand({ pointToMultiply: point, pointToCompare: bobPoint, p, a })

	console.log(`nAlice: ${nAlice.toString()}, nBob: ${nBob.toString()}`)

	// --- 3 ---
	const commonPoint = multiply2Points({ point: alicePoint, times: nBob.mod(p), a, p })
	console.log(`Common point on curve ${toStringPoint(commonPoint)}`)

	const cesarCodeShift = (commonPoint as ExistingPoint).x.mod(langSize)
	console.log(`Cesar code shift: ${cesarCodeShift.toString()}`)

	const decryptedString = decryptCesarCode({
		encryptedString: letter,
		key: cesarCodeShift,
		languageLength: langSize,
		firstLetterCode: 'a'.charCodeAt(0),
	})
	console.log(`decrypted letter: '${decryptedString}'`)

	// --- 4 ---

	const eulerFnValue = calcEulerFunction(p)
	console.log(`Number of points on curve = phi(N) = ${eulerFnValue.toString()}`)

	console.groupEnd()
	return {
		orderP,
		nAlice,
		nBob,
		commonPoint,
		cesarCodeShift,
		decryptedString,
		eulerFnValue,
	}
}
