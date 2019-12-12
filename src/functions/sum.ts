import { Big } from 'big.js'
import { isPresent, toBig } from '../help/helpers'
import { Point } from '../help/model'
import { arePointsEqual, divideOverP } from '../help/util'

export const sum = ({ p1, p2, a, p }: { p1: Point; p2: Point; p: Big; a: Big }): Point => {
	if (!isPresent(p1) || p1 === 0) return p2
	if (!isPresent(p2) || p2 === 0) return p1

	const { x: x1, y: y1 } = p1
	const { x: x2, y: y2 } = p2
	let s: Big

	if (arePointsEqual(p1, p2)) {
		if (x1.eq(0)) {
			return 0
		}

		const numerator = toBig(3)
			.mul(x1.pow(2))
			.plus(a)
		const denominator = toBig(2).mul(y1)

		s = divideOverP(numerator, denominator, p)
	} else {
		if (x1.minus(x2).eq(0)) {
			return 0
		} else {
			const numerator = y2.minus(y1)
			const denominator = x2.minus(x1)

			s = divideOverP(
				numerator.lt(0) ? numerator.plus(p) : numerator,
				denominator.lt(0) ? denominator.plus(p) : denominator,
				p
			)
		}
	}

	const x = s
		.pow(2)
		.minus(x1)
		.minus(x2)
		.mod(p)

	const y = y1
		.mul(-1)
		.minus(s.mul(x.minus(x1)))
		.mod(p)

	return {
		x: x.lt(0) ? x.plus(p) : x,
		y: y.lt(0) ? y.plus(p) : y,
	}
}
