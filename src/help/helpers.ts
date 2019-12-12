import { Big } from 'big.js'
import { Point } from './model'

export const isPresent = x => x !== undefined && x !== null

export const toBig = x => new Big(x)

export const toStringPoint = (p: Point): string => {
	if (p === 0) {
		return '∞'
	}

	return `{ x: ${+p.x}, y: ${+p.y} }`
}
