import type { FSPathLike } from './types/typing.mjs';

/**
 * Abstract Base Class for Path
 */
 export abstract class AbstractPath {

	abstract _verified: boolean;
	abstract writeable: null | boolean;
	abstract active_path: FSPathLike;
	abstract isDirectory: null | boolean;
	abstract isFile: null | boolean;

	abstract toString(): string;
}

