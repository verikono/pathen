import { AbstractPath } from '../abc.mjs';
import type { FSPath } from '../types/typing.mjs';

export const isFSPath = (value: unknown): value is FSPath =>  {
	if(value instanceof AbstractPath) {
		return true;
	}
	return false;
}






/*** !-- Inline Tests --! */

if(import.meta.vitest) {

	const { describe, it, expect, chai } = import.meta.vitest;
	const { default: chaiArrays} = await import('chai-arrays');
	chai.use(chaiArrays);

	describe('TypeGuard Test: isFSPath', async () => {
		const { Path } = await import('../Path.mjs');
		it('tests isFSPath for the most basic use case', async () => {
			Path;
			expect;
			// const testpath = new Path();
			
		});

	});

}

/* !-- Inline Tests --! ***/
