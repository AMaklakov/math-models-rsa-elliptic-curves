import { Big } from 'big.js'
import { toBig } from '../help/helpers'
import { Point } from '../help/model'
import { sum } from './sum'

export interface MultiplyPointByNumberArgumentModel {
	point: Point
	times: Big
	p: Big
	a: Big
}

export const multiply = ({ point, times, a, p }: MultiplyPointByNumberArgumentModel): Point => {
	let res = point

	for (let i = toBig(1); i.lt(times); i = i.plus(1)) {
		res = sum({ p1: res, p2: point, p: p, a: a })
	}

	return res
}
