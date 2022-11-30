import NotImplementedError from 'errors/NotImplementedError.mjs';
import type { RelativePath } from '../types/typing.mjs';

export const isRelativePath = (value: unknown): value is RelativePath =>  {
	value;
	throw new NotImplementedError('todo', 'isRelativePath');
}
