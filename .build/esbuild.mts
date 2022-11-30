import { BuildOptions, buildSync } from "esbuild";
import * as fs from 'node:fs';

fs.rmSync('dist', {recursive:true});

const shared: BuildOptions = {
	entryPoints:["source/index.mts"],
	external: ["node:fs", "node:process", "node:path"],
	bundle: true,
	define: {
		"import.meta.vitest": "undefined"
	}
}

buildSync(Object.assign({ outfile: 'dist/index.mjs', format: 'esm' }, shared));
console.info("ESM build successful");

buildSync(Object.assign({ outfile: 'dist/index.cjs', format: 'cjs' }, shared));
console.info("CommonJS build successful");
