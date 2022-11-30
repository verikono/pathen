import type { IPathValidation } from "./types/interfaces.mjs";

export const PathValidationDefaults: IPathValidation = Object.freeze({
	readable: false,
	writable: false,
	executable: false,
	file: false,
	directory: false
})


