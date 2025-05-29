import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware {
    use(req: any, res: Response, next: any) {
        // console.log(req.originalUrl) # LOGGING
        next()
    }
}