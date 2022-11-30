import chai from 'chai';
import chaiArrays from 'chai-arrays';
import { defineConfig } from 'vitest/config';
chai.use(chaiArrays);

export default defineConfig({
	test: {
		threads: false,
		testTimeout: 240000,
		includeSource: ['source/**/*']
	}
});
