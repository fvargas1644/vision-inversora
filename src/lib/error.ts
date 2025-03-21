export class RequestError extends Error {
    constructor(message : string){
        super(message)
        this.message = message
    }
}

export class ValidateError extends Error {
    constructor(message : string){
        super(message)
        this.message = message
    }
}