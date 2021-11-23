import { Big } from 'big.js'

export const toBig = x => new Big(x)

export const getInverseNumber = (num: Big, p: Big): Big => {
	for (let i = toBig(0); i.lt(p); i = i.plus(1)) {
		const product = num.mul(i).mod(p)
		if (product.eq(1)) return toBig(i)
	}
}

export const divideOverP = (dividend: Big, divider: Big, p: Big): Big =>
	dividend.mul(getInverseNumber(divider, p)).mod(p)

export const getSquareRootOverP = (x: number, p: number): Big | null => {
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

export const calcEulerFunction = (n: Big): Big => {
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

export const phi = calcEulerFunction
