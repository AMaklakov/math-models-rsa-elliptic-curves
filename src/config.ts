import { toBig } from './help/helpers'
import { Point } from './help/model'

// y^2 = x^3 + a * x + b
export const [A, B] = [toBig(-2), toBig(5)]
// export const [A, B] = [toBig(-2), toBig(5)]

export const P = toBig(383)
// export const P = toBig(379)

export const POINT: Point = { x: toBig(2), y: toBig(3) }
// export const POINT: Point = { x: toBig(2), y: toBig(3) }

// --- 2

export const P_ALICE: Point = { x: toBig(153), y: toBig(284) }
// export const P_ALICE: Point = { x: toBig(19), y: toBig(377) }

export const P_BOB: Point = { x: toBig(149), y: toBig(40) }
// export const P_BOB: Point = { x: toBig(55), y: toBig(166) }

// --- 3

// English
export const LANGUAGE_SIZE = 26

export const LETTER = 'thtwwdeljszxpezolj'
// export const LETTER = 'pixywqiixxsqsvvsa'

// ========= RSA =========

export const RSA_K = toBig(249)
export const RSA_N = toBig(1189)

export const INPUT_ARRAY = [1115, 887, 141, 1115, 1038, 141, 35, 1109, 536, 35, 1038]
