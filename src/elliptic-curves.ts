import { calcEulerFunction } from './functions/euler-function'
import { decrypt } from './functions/cesar-algorithm'
import { multiply } from './functions/multiply-point-by-number'
import { getMultiplicand } from './functions/get-multiplicand'
import { getOrder } from './functions/get-point-order'
import { toStringPoint } from './help/helpers'
import { ExistingPoint, Point } from './help/model'
import { Big } from 'big.js'

export const solveEllipticCurves = ({
	point,
	a,
	p,
	alicePoint,
	bobPoint,
	langSize,
	letter,
}: {
	point: Point
	a: Big
	p: Big
	alicePoint: Point
	bobPoint: Point
	langSize: number
	letter: string
}) => {
	console.group('\n\n------ ELLIPTIC CURVES -------')

	// --- 1 ---
	const orderP = getOrder({ point, a, p })
	console.log(`Order of point ${toStringPoint(point)} is`, orderP)

	// --- 2 ---
	const nAlice = getMultiplicand({ pointToMultiply: point, pointToCompare: alicePoint, p, a })
	const nBob = getMultiplicand({ pointToMultiply: point, pointToCompare: bobPoint, p, a })

	console.log(`nAlice: ${nAlice.toString()}, nBob: ${nBob.toString()}`)

	// --- 3 ---
	const totalPoint = multiply({ point: alicePoint, times: nBob.mod(p), a, p })
	console.log(`Common point on curve ${toStringPoint(totalPoint)}`)

	const k = (totalPoint as ExistingPoint).x.mod(langSize)
	console.log(`Cesar code shift: ${k.toString()}`)

	const decryptedString = decrypt({
		encryptedString: letter,
		key: k,
		languageLength: langSize,
		firstLetterCode: 'a'.charCodeAt(0),
	})
	console.log(`decrypted letter: '${decryptedString}'`)

	// --- 4 ---

	const size = calcEulerFunction(p)
	console.log(`Number of points on curve = phi(N) = ${size.toString()}`)

	console.groupEnd()
}
