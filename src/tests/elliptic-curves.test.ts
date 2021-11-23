import { solveEllipticCurves } from '../elliptic-curves'
import { toBig } from '../util/math-over-module'
import { toStringPoint } from '../util/points'

describe('Elliptic curves', () => {
	test('returns expected result', () => {
		const result = solveEllipticCurves({
			point: { x: toBig(2), y: toBig(3) },
			a: toBig(-2),
			p: toBig(383),
			alicePoint: { x: toBig(153), y: toBig(284) },
			bobPoint: { x: toBig(149), y: toBig(40) },
			langSize: 26,
			letter: 'thtwwdeljszxpezolj',
		})

		expect(result.decryptedString).toBe('iwillstayhometoday')
		expect(result.cesarCodeShift.toString()).toBe('11')
		expect(result.nAlice.toString()).toBe('79')
		expect(result.nBob.toString()).toBe('113')
		expect(result.orderP.toString()).toBe('200')
		expect(result.eulerFnValue.toString()).toBe('382')
		expect(toStringPoint(result.commonPoint)).toBe('{ x: 193, y: 41 }')
	})
})
