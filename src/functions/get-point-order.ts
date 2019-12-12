import { Big } from 'big.js'
import { Point } from '../help/model'
import { sum } from './sum'

export interface GetPointOrderArgumentModel {
	point: Point
	p: Big
	a: Big
}

export const getOrder = ({ point, p, a }: GetPointOrderArgumentModel) => {
	let i = 1
	let res = point

	while (res !== 0) {
		res = sum({ p1: res, p2: point, p: p, a: a })
		i++
	}

	return i
}
