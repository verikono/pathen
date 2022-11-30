/**
 * Implementation: TypeGuard isRelativeDirectoryPathLike
 */

import NotImplementedError from "errors/NotImplementedError.mjs";
import type { RelativeDirectoryPathLike } from "types/typing.mjs";

export const isRelativeDirectoryPathLike = (value: unknown, ):value is RelativeDirectoryPathLike => {
	value;
	throw new NotImplementedError('todo', 'isRelativeDirectoryPathLike')
}





/*** !-- Inline Tests --! */

if(import.meta.vitest) {

	const { describe, it, expect, chai } = import.meta.vitest;
	const { default: chaiArrays} = await import('chai-arrays');
	chai.use(chaiArrays);

	describe('Tests TypeGuard: isRelativeDirectoryPathLike', async () => {

		it('tests label for the most basic use case', async () => {
			expect;
			
		});

	});

}

/* !-- Inline Tests --! ***/
