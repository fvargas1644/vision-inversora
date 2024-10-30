export class RequestError extends Error {
    constructor(message : string){
        super(message)
        this.message = 'RequestError'
    }
}

export class ValidateError extends Error {
    constructor(message : string){
        super(message)
        this.message = 'ValidateError ' 
    }
}