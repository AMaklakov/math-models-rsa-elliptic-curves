import { solveEllipticCurves } from './elliptic-curves'
import { hackRSA } from './hack-rsa'
import { toBig } from './util/math-over-module'

// Task 1. Hack RSA: replace n, k and codes with your ones
hackRSA({
	n: toBig(1739),
	k: toBig(523),
	codesToTranslate: [1484, 1228, 1224, 1346, 718, 973, 1583, 1346, 874, 553, 170, 973, 682, 401],
})

// Task 2. Elliptic curves
solveEllipticCurves({
	point: { x: toBig(2), y: toBig(3) },
	a: toBig(-2),
	p: toBig(383),
	alicePoint: { x: toBig(153), y: toBig(284) },
	bobPoint: { x: toBig(149), y: toBig(40) },
	langSize: 26,
	letter: 'thtwwdeljszxpezolj',
})
