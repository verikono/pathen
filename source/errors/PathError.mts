/**
 * Path Error Base class.
 */
import * as clc from 'cli-color';

import type { ErrorOptions } from "types/interfaces.mjs";

export class PathError extends Error {

	props: Record<string, string>;

	constructor(message: string, keywords:ErrorOptions={props:{}}) {
		super(message);
		this.props = keywords.props;
		Error.captureStackTrace(this, PathError);
	}

	override_console_error() {
		console.error = this.log;
	}

	log(message: string) {
		const lines = []
		let palette = clc.xterm(15).bgXterm(161)
		lines.push(palette(' # -- Error -- # '))
		lines.push(message);
	}
}

export default PathError;




/***-- Inline Developer Tests  ***/

if(import.meta.vitest) {

	const { describe, it, expect } = import.meta.vitest;

	describe('spec - Erroring output', () => {

		it('overrides the console.error function', () => {
			expect(true).toBeTruthy();

		});

	})

}

/*** Copyright 2022 Enterra Solutions --***/
