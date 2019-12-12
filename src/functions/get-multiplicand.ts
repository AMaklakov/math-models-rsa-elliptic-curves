import { Big } from 'big.js'
import { toBig } from '../help/helpers'
import { ExistingPoint, Point } from '../help/model'
import { arePointsEqual } from '../help/util'
import { getOrder } from './get-point-order'
import { sum } from './sum'

export interface GetMultiplicandParamModel {
	pointToMultiply: Point
	pointToCompare: Point
	p: Big
	a: Big
}
export const getMultiplicand = ({ pointToMultiply, pointToCompare, p, a }: GetMultiplicandParamModel): Big => {
	const order = getOrder({ point: pointToMultiply, p, a })

	for (let i = toBig(1); i.lte(order); i = i.plus(1)) {
		let res = pointToMultiply

		for (let j = toBig(1); j.lt(i); j = j.plus(1)) {
			res = sum({ p1: res, p2: pointToMultiply, p: p, a: a }) as ExistingPoint
		}

		if (arePointsEqual(res as ExistingPoint, pointToCompare as ExistingPoint)) {
			return i
		}
	}
}
