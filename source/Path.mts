import { accessSync, constants, copyFileSync, createReadStream, mkdirSync, openSync, readdirSync, readFileSync, ReadStream, statSync } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import * as path from 'node:path';
import * as proc from 'node:process';

import { AbstractPath } from './abc.mjs';
import { PathValidationDefaults } from './defaults.mjs';
import { NotImplementedError, WrongPathType } from './errors/index.mjs';
import { isSystemError } from './guards/index.mjs';

import { createHash } from 'node:crypto';

import type { IPathValidation } from './types/interfaces.mjs';

import type {
	AbsolutePathLike,
	DirectoryName,
	DirectoryPathLike,
	FileName,
	FilePathLike,
	FSPathLike,
	FSPathStr,
	RelativeDirectoryPathLike,
	RelativePathLike
} from './types/typing.mjs';




/**
 * 
 * Flagrant and unashamed rip off of the wonderful work that is pathlib.Path on python3.
 * 
 */
export class Path extends AbstractPath {


	active_path: FSPathStr;

	/** existence for this path has been performed */
	_verified: boolean;

	/** when a boolean this location has been verified to exist or not exist, null meaning it has not been checked. */
	_exists: null | boolean;

	/** when a boolean this location has been verified to be writeable or not writeable, null meaning it has not been checked. */
	_writeable: null | boolean;

	/** when a boolean this location has been verified to be an existing directory or otherwise, if null this has not been checked */
	_isDirectory: null | boolean;

	/** when a boolean this location has been verified to be an existing file or otherwise, if null this has not been checked */
	_isFile: null | boolean;

	/** hey... this is an initial commit works is it not? the logger... */
	logger: Console



	constructor(fspath?: FSPathLike) {
		super();
		this.active_path = fspath ? fspath.toString() : proc.cwd();
		this.logger = console;
	
		this._verified = false;
		this._exists = null;
		this._writeable = null;
		this._isDirectory = null;
		this._isFile = null;
	}

	/**
	 * 
	 * @param relpath RelativePath 
	 * @param options IPathvadliation
	 * @returns Promise boolean
	 */
	public async exists(relpath?: RelativePathLike, options: IPathValidation={}): Promise<boolean> {

		if(this._exists === null) {
			try {
				const optioned = Object.assign({}, PathValidationDefaults, options);
				const opath: AbsolutePathLike = path.resolve(relpath ? path.join(this.active_path.toString(), relpath.toString()) : this.active_path);
				access(opath.toString(), this.get_optioned_constants(optioned));
				if(optioned.file) return (await stat(opath.toString())).isFile();
				if(optioned.directory) return (await stat(opath.toString())).isDirectory();
				this._exists = true;
			}
			catch( err: unknown ) {
				if(isSystemError(err)) {
					if(err.code === 'ENOENT') {
						this._exists = false;
						return this._exists;
					}
				}
				throw err;
			}
		}
		if(typeof this._exists === 'boolean')
			return this._exists;
		throw new Error('Path::exists has reached a condition where the filesystem nodes existence should be binary but remains unknown.');
	}

	public existsSync(relpath?: RelativePathLike, options: IPathValidation={}): boolean {

		try {

			const optioned = Object.assign({}, PathValidationDefaults, options);
			const opath: AbsolutePathLike = path.resolve(relpath ? path.join(this.active_path.toString(), relpath.toString()) : this.active_path);
			accessSync(opath.toString(), this.get_optioned_constants(optioned));
			if(optioned.file) return statSync(opath.toString()).isFile();
			if(optioned.directory) return statSync(opath.toString()).isDirectory();
			return true;

		}
		catch( err: unknown ) {
			if(isSystemError(err)) {
				if(err.code === 'ENOENT') {
					return false;
				}
			}
			throw err;
		}
	}

	/**
	 * 
	 * @param optioned IPathValidation
	 * 
	 * @returns Bitwise
	 */
	private get_optioned_constants(optioned: IPathValidation): number {
		const { writeable, executable } = optioned;
		const { R_OK, W_OK, X_OK } = constants;
		if(writeable && executable) return R_OK | W_OK | X_OK;
		if(writeable) return R_OK | W_OK;
		if(executable) return R_OK | X_OK;
		return R_OK;
	}

	toString(): string {
		return this.active_path;
	}

	log(): void {
		this.logger.info(`current path - ${this.active_path}`)
	}

	child(relpath: RelativePathLike): Path {
		return new Path(path.join(this.active_path, relpath.toString()));
	}

	parents(): DirectoryPathLike[] {
		
		const parts = this.parts();
		const paths = [];
		
		while(parts.length) {
			paths.push(new Path(parts.join(path.sep)));
			parts.pop();
		}
		return paths;
	}

	verify(): void {
		this.existsSync();
		this.isFile
		this.isDirectory
		this._verified = true;
	}


	get isFile():boolean {
		if(typeof this._isFile !== 'boolean') {
			this._isFile = statSync(this.active_path).isDirectory();
		}
		return this._isFile;
	}

	get isDirectory():boolean {
		if(typeof this._isDirectory !== 'boolean') {
			this._isDirectory = statSync(this.active_path).isDirectory();
		}
		return this._isDirectory;
	}

	get writeable():boolean {
		if(this._writeable === null) {
			const { R_OK, W_OK } = constants;
			try {
				accessSync(this.active_path, R_OK | W_OK);
				this._writeable = true;
			}
			catch( err ) {
				this._writeable = false;
			}
		}
		return this._writeable;
	}

	/** the file or directory name the path is resolving to */
	get name(): FileName | DirectoryName {
		return path.basename(this.active_path)
	}

	get path(): FSPathStr {
		return this.active_path;
	}

	/** get this path's immediate parent - think cd .. */
	get parent(): Path {
		return new Path(this.active_path.split(path.sep).slice(0,-1).join(path.sep));
	}

	/** get how many directories deep this path is from the root */
	get depth(): number {

		return this.active_path.split(path.sep).filter(v => !!v).length;
	}

	to( target: RelativePathLike ): Path {

		target;
		throw new NotImplementedError('wrapping it up for now', 'to', 'Path');
		// const parts = target.split(path.sep);
		// return new Path(path.resolve(path.relative(this.active_path, target.toString())))
	}

	/** get the the directories that comprise this path - eg: /home/friend/files/file.txt will return ['home', 'friend', 'files'] */
	parts():string[] {

		return this.active_path.split(path.sep).filter(part => !!part.length)
	}

	create(type: 'file' | 'directory', options={overwrite:false}) {
		type; options;
		throw new NotImplementedError('wrapping it up for now', 'to', 'Path');
	}

	createIfNotExists(type: 'file' | 'directory'): Path {

		if(this.existsSync()) return this;
		if(type === 'file') {
			return this.touch();
		}
		else {
			return this.mkdir(this.active_path, {silent:true, exists:false});
		}

	}

	mkdir(relpath: RelativeDirectoryPathLike = this.active_path, options:{silent:boolean, exists:null | boolean}={silent: false, exists: null}) {

		if(relpath === this.active_path) {
			if(this.existsSync()) {
				if(this.isDirectory){
					return this;
				}
				else {
					throw new Error(`Refusing the create directory - file exists at its target : ${this.active_path}`);
				}
			}
			mkdirSync(this.active_path);
			this._exists = true;
			this._isDirectory = true;
			this._isFile = false;
			return this;
		}
		options;
		throw new NotImplementedError('todo', 'mkdir', 'Path');
		// const directories = relpath.toString().split(path.sep).map(relpath => path.join(this.active_path, relpath));

	}

	/**
	 * Get all files in the directory as Path instances
	 * 
	 * @returns Path Array where each Path in the Array is a Path instance for a file in the directory.
	 */
	files(): Path[] {
		if(this.isDirectory) {
			return readdirSync(this.active_path, {withFileTypes:true })
				.reduce((acc, entry) => entry.isFile() ? acc.concat([ new Path(this.active_path).child(entry.name) ]) : acc, [] as Path[])	
		}
		throw new Error(`Current Path is a FilePath, not a directory - ${this.active_path}`)
	}


	/**
	 * Touch a file into existence
	 * 
	 * @param mod the files permissions mode , eg 777 , 644 etc.
	 * 
	 * @todo: provide another way to set mod.
	 * @returns Path
	 */
	touch(mod=666): Path {
		if(this.isFile) {
			openSync(this.active_path, 'rw', mod);
			return this;
		}
		throw new WrongPathType('touch can only be used on files.', {props:{method:'touch', class:'Path'}})
	}

	/**
	 * get the MD5 hash of the file contents
	 * 
	 * @returns string
	 */
	md5(): string {
		if(this.isFile) {
			return createHash('md5').update(this.read()).digest('hex');
		}
		throw new WrongPathType('md5 can only be used on files.');
	}

	/**
	 * Read the entire contents of the file at this location into memory... so be careful won't you ;) - use readStream for the big stuff
	 * 
	 * @returns 
	 */
	read():string {
		
		if(this.isFile) {
			return readFileSync(this.active_path, { encoding: 'utf8' })
		}
		throw new WrongPathType('directories cannot be "read"', {props:{method: 'read', class:'Path'}});
	}

	/**
	 * Use this File as a streaming source (ReadStream)
	 * 
	 * @returns ReadStream
	 */
	readStream():ReadStream {
		if(this.isFile) {
			return createReadStream(this.active_path)
		}
		throw new WrongPathType('current path is a directory - what would I stream?');
	}

	copy(target_filepath: FilePathLike, options={overwrite: false}): Path {
		options;
		if(this.isFile) {
			copyFileSync(this.active_path, target_filepath.toString());
			return new Path(target_filepath);
		}
		throw new NotImplementedError('copying directories isnt supported yet :(', 'copy', 'Path');
	}

}

export default Path;




/*** !-- Inline Tests --! */

if(import.meta.vitest) {
	
	const { test, expect, chai } = import.meta.vitest;
	const { default: chaiArrays} = await import('chai-arrays');
	chai.use(chaiArrays);

	test('files', async () => {
		const filepaths = new Path().files();
		expect(filepaths).to.be.array();
		for(const filepath of filepaths) {
			expect(filepath).to.be.instanceOf(Path);
			console.log(filepath.isFile, filepath.path);
			expect(filepath.isFile).to.be.true;
		}	
	});

	test('parent', async () => {
		const testpath = new Path();
		const testpath_parent = testpath.parent;
		testpath_parent.verify();
	});

	test('parts', () => {
		const testpath = new Path();
		let parts = testpath.parts();
		expect(parts).to.be.instanceOf(Array);
		expect(parts).to.have.length.above(1);
		parts.forEach(part => expect(part).to.be.a.string);
		testpath.child('package.json');
		expect(testpath.isFile).to.be.true;
		parts = testpath.parts();
		expect(parts).to.be.array();
	});

	test('parents', () => {
		const testpath = new Path();
		const depth = testpath.depth;
		const parents = testpath.parents();
		expect(parents.length).to.equal(depth);
	});


}

/* !-- Inline Tests --! ***/
