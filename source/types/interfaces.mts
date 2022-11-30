export interface ISystemError {
	
	/** If present, the address to which a network connection failed */
	address?: string;
	
	/** The string error code */
	code: string;
	
	/** If present, the file path destination when reporting a file system error */
	dest?: string;

	/**The system-provided error number */
	errno: number;

	/** If present, extra details about the error condition */
	info?: Record<any, any>;

	/** A system-provided human-readable description of the error */
	message: string;

	/** If present, the file path when reporting a file system error */
	path?: string;

	/** If present, the network connection port that is not available */
	port?: number;

	/** The name of the system call that triggered the error */
	syscall?: string;
}

/**
 * path validation protocol/interface - a common shape useful for validating aspects of a file system node.
 * 
 */
 export interface IPathValidation {

	/** when flagged true the filesystem checks for the node existence (so far as the runtime this is operating upon has the rights!) */
	assert?: boolean;

	/** this should always be true... lol, unless kept here for unintialized targets ;) */
	readable?: boolean;

	/** when flagged true the filesystem checks the ability to write upon the filesystme path */
	writeable?: boolean;

	/** when flagged true the filesystem checks the ability to execute upon the filsystem filepath */
	executable?: boolean;

	/** when flagged true the path validation should also confirm a file exists not a directory */
	file?:boolean;

	/** when flagged true the path validation should also confirm a directory exists, not a file */
	directory?:boolean;
}


export interface ErrorOptions {

	props: Record<string, string>;
}
