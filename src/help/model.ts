import { Big } from 'big.js';

export type ExistingPoint = { x: Big; y: Big };

export type Point = ExistingPoint | 0;
