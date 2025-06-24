import { Status } from '../deps.ts';

export class NotFoundException extends Error {
    statusCode: number;
    constructor(message: string = 'Not Found') {
        super(message);
        this.name = 'NotFoundException';
        this.statusCode = Status.NotFound;
    }
}

export class BadRequestException extends Error {
    statusCode: number;
    constructor(message: string = 'Bad Request') {
        super(message);
        this.name = 'BadRequestException';
        this.statusCode = Status.BadRequest;
    }
}

export class InternalServerErrorException extends Error {
    statusCode: number;
    constructor(message: string = 'Internal Server Error') {
        super(message);
        this.name = 'InternalServerErrorException';
        this.statusCode = Status.InternalServerError;
    }
}
