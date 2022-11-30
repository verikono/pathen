
import { AbstractPath } from '../abc.mjs';
import type { FSPathLike } from '../types/typing.mjs';
import { isFSPath } from './isFSPath.mjs';
import { isFSPathStr, regex } from './isFSPathStr.mjs';

export const isFSPathLike = (value: unknown): value is FSPathLike =>  {
	if(value instanceof AbstractPath || typeof value === 'string') {
		return typeof value === 'string' ? isFSPathStr(value) : isFSPath(value);
	}
	return false;
}

export {
	regex
};





/*** !-- Inline Tests --! */

if(import.meta.vitest) {

	const { describe, it, expect, chai } = import.meta.vitest;
	const { default: chaiArrays} = await import('chai-arrays');
	chai.use(chaiArrays);
	const { Path } = await import('../Path.mjs');
	describe('TypeGuard Test: isFSPath', async () => {

		describe('testing items expected to pass', async () => {
			it('/home/user', () => expect(isFSPathLike('/home/user')).to.be.true)
			it('/home/user', () => expect(isFSPathLike('/home/user/profile.txt')).to.be.true)
		});

		it.todo('tests isFSPathLike for the most basic use case', async () => {
			Path;
	
		});

		it.todo('confirms a valid absolute filepath as a string', async () => {

		});

	});

}

/* !-- Inline Tests --! ***/
