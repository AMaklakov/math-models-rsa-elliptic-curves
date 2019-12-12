import { Big } from 'big.js'
import { toBig } from '../help/helpers'

/**
 * Does exist such y : y * y = x
 *
 * @param x - number
 * @param p - modulo
 */
export const isSquare = (x: number, p: number): Big | null => {
	for (let i = 1; i < p; i++) {
		const r = toBig(i)
			.pow(2)
			.mod(p)

		if (r.eq(x)) {
			return toBig(i)
		}
	}

	return null
}
