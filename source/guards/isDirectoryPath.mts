import NotImplementedError from 'errors/NotImplementedError.mjs';
import type { DirectoryPath } from '../types/typing.mjs';

export const isDirectoryPath = ( value:unknown ): value is DirectoryPath =>  {
	value;
	throw new NotImplementedError('todo', 'isDirectoryPath');
}
