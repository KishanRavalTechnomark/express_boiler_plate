export class CustomError extends Error {
	statusCode: number;
	errors: any | any[]

  constructor(statusCode:number, message: string, errors: any | any[]) {
    super(message);
		this.statusCode = statusCode;
    // this.name = 'CustomError';
		this.errors = errors;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}