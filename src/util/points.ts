import { isPresent } from './helpers'
import { Big } from 'big.js'
import { divideOverP, toBig } from './math-over-module'

export type ExistingPoint = { x: Big; y: Big }

export type Point = ExistingPoint | 0

export const toStringPoint = (p: Point): string => (p === 0 ? '∞' : `{ x: ${+p.x}, y: ${+p.y} }`)

export const arePointsEqual = (p1: ExistingPoint, p2: ExistingPoint) => p1.x.eq(p2.x) && p1.y.eq(p2.y)

export const getPointOrder = ({ point, p, a }: { point: Point; p: Big; a: Big }) => {
	let i = 1
	let res = point

	while (res !== 0) {
		res = add2Points({ p1: res, p2: point, p: p, a: a })
		i++
	}

	return i
}

export const multiply2Points = ({ point, times, a, p }: { point: Point; times: Big; p: Big; a: Big }): Point => {
	let res = point

	for (let i = toBig(1); i.lt(times); i = i.plus(1)) {
		res = add2Points({ p1: res, p2: point, p: p, a: a })
	}

	return res
}

export const getMultiplicand = ({
	pointToMultiply,
	pointToCompare,
	p,
	a,
}: {
	pointToMultiply: Point
	pointToCompare: Point
	p: Big
	a: Big
}): Big => {
	const order = getPointOrder({ point: pointToMultiply, p, a })

	for (let i = toBig(1); i.lte(order); i = i.plus(1)) {
		let res = pointToMultiply

		for (let j = toBig(1); j.lt(i); j = j.plus(1)) {
			res = add2Points({ p1: res, p2: pointToMultiply, p: p, a: a }) as ExistingPoint
		}

		if (arePointsEqual(res as ExistingPoint, pointToCompare as ExistingPoint)) {
			return i
		}
	}
}

export const add2Points = ({ p1, p2, a, p }: { p1: Point; p2: Point; p: Big; a: Big }): Point => {
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
