import { hackRSA } from '../hack-rsa'
import { toBig } from '../util/math-over-module'

describe('Hack RSA tests', () => {
	test('returns valid answer', () => {
		expect(
			hackRSA({
				n: toBig(1739),
				k: toBig(523),
				codesToTranslate: [1484, 1228, 1224, 1346, 718, 973, 1583, 1346, 874, 553, 170, 973, 682, 401],
			})
		).toBe('beautiful mind')
	})
})
