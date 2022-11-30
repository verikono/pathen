import type { ErrorOptions } from "types/interfaces.mjs";
import PathError from "./PathError.mjs";

export class WrongPathType extends PathError {

	constructor(message: string = '', keywords:ErrorOptions={ props:{} }) {
		super(message, keywords)
	}
}

export default WrongPathType;
