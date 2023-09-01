export function isObject(input: any): input is object {
	return typeof input === 'object' && input !== null;
}

export function isString(input: any): input is string {
	return typeof input === 'string' && input !== '';
}
