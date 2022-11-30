import type { ISystemError } from '../types/interfaces.mjs';
import { isObject } from './isObject.mjs';

export const isSystemError = (value: unknown):value is ISystemError => {
	if(isObject(value)) {
		if(value instanceof Error) {
			return true;
		}
	}
	return false;
}

export default isSystemError;
