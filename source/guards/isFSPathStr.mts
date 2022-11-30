/**
 * 
 * 
 */

import type { FSPathStr } from '../types/typing.mjs';

export const regex = new RegExp('^(.+)\/([^\/]+)$');

export const isFSPathStr = (value: unknown): value is FSPathStr =>  {
	if(typeof value === 'string') {
		const gg = regex.test(value)		
		console.log(gg);
		return gg;
	}
	return false;
}






/*** !-- Inline Tests --! */

if(import.meta.vitest) {

	const { describe, it, expect, chai } = import.meta.vitest;
	const { default: chaiArrays} = await import('chai-arrays');
	chai.use(chaiArrays);

	describe('TypeGuard Test: isFSPath', async () => {

		it('tests isFSPathStr for the most basic use case', async () => {
			const rez = isFSPathStr('/home/bren');
			expect(rez).to.be.true;
		});

		it('tests isFSPathStr fails "(*&ASD(*&AD" ', async () => {
			const rez = isFSPathStr('(*&ASD(*&AD');
			expect(rez).to.be.false;
		});

		it('confirms a valid absolute filepath as a string', async () => {

		});

	});

}
/* !-- Inline Tests --! ***/
