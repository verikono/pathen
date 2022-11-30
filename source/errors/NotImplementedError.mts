
export class NotImplementedError extends Error {

	function_name: string;
	class_name: string;

	constructor( message: ( string | null | undefined ), function_name: string, class_name?: string ) {
		message = message || 'no message provided';
		super(message);
		this.function_name = function_name;
		this.class_name = class_name || 'none'
	}

}

export default NotImplementedError;
