import { Big } from 'big.js'
import { toBig } from '../help/helpers'

export const getInverseNumber = (k: Big, phiN: Big): Big => {
	for (let l = toBig(1); l.lt(phiN); l = l.plus(1)) {
		const product = k.mul(l)

		if (product.mod(phiN).eq(1)) {
			return l
		}
	}
}
