
export const isObject = (value:unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export default isObject;
