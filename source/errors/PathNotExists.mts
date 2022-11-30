
import PathError from "./PathError.mjs";

export class PathNotExists extends PathError {

	constructor(message: string = '') {
		super(message)
	}
}
