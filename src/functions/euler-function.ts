import { Big } from 'big.js'
import { toBig } from '../help/helpers'

export const phi = (n: Big): Big => {
	let result: Big = n

	for (let i = toBig(2); i.mul(i).lte(n); i = i.plus(1)) {
		if (n.mod(i).eq(0)) {
			while (n.mod(i).eq(0)) {
				n = n.div(i)
			}

			result = result.minus(result.div(i))
		}
	}

	if (n.gt(1)) {
		result = result.minus(result.div(n))
	}

	return result
}
