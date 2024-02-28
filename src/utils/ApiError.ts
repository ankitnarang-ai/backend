class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: any[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message); // Call the constructor of the parent class (Error)

        // Initialize properties specific to the ApiError class
        this.statusCode = statusCode; // HTTP status code associated with the error
        this.data = null; // Additional data associated with the error (defaulted to null)
        this.success = false; // Indicates whether the operation was successful (defaulted to false)
        this.errors = errors; // Array to store additional errors

        // If a stack trace is provided, set it; otherwise, capture the stack trace
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export {ApiError}