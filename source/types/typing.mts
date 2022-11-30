import type { AbstractPath } from '../abc.mjs';

export type FileName = string;

export type DirectoryName = string;

/** A Filesystem path of any type or operating system as a simple string */
export type FSPathStr = string;

/** A Filesystem path of any type or operating system as a simple string or a Path instance*/
export type FSPathLike = string | AbstractPath;

/** A Filesystem path of any type or operating system as a Path instance*/
export type FSPath = AbstractPath;

/** A Filesystem path relative to the root of any type or operating system */
export type AbsolutePathLike = FSPathLike;
export type AbsolutePath = AbstractPath;

/** A Filesystem path relative to ANYWHERE BUT the root */
export type RelativePathLike = FSPathLike;
export type RelativePath = AbstractPath;

/** A Filesystem path that resolves to a File */
export type FilePathLike = FSPathLike;
export type FilePath = AbstractPath; 

/** A Filesystem path that resolves to a Directory */
export type DirectoryPathLike = FSPathLike;
export type DirectoryPath = AbstractPath;

/** A FileSystem Path which resolves to the a file relative from the root */
export type AbsoluteFilePathLike = FilePathLike;
export type AbsoluteFilePath = AbstractPath;

/** A FileSystem Path which resolves to a directory relative from the root */
export type AbsoluteDirectoryPathLike = DirectoryPathLike;
export type AbsoluteDirectoryPath = AbstractPath;

export type RelativeDirectoryPathLike = DirectoryPathLike;
export type RelativeDirectoryPath = AbstractPath;




