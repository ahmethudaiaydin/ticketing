export abstract class CustomError extends Error {
    abstract statusCode: number;
    
    abstract serializeErrors(): {
        message: string,
        field?: String
    }[]

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}