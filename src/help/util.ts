import { Big } from 'big.js'
import { toBig } from './helpers'
import { ExistingPoint } from './model'

export const getDivider = (num: Big, p: Big): Big => {
	for (let i = toBig(0); i.lt(p); i = i.plus(1)) {
		const product = num.mul(i).mod(p)

		if (product.eq(1)) {
			return toBig(i)
		}
	}
}

export const divideOverP = (dividend: Big, divider: Big, p: Big): Big => dividend.mul(getDivider(divider, p)).mod(p)

export const arePointsEqual = (p1: ExistingPoint, p2: ExistingPoint) => p1.x.eq(p2.x) && p1.y.eq(p2.y)
