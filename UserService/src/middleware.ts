import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class FingerprintMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req['clientFingerprint'] = {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      acceptLanguage: req.headers['accept-language'],
    }
    next()
  }
}

@Injectable()
export class LoggerMiddleware {
    use(req: any, res: Response, next: any) {
        // console.log(req.originalUrl) # LOGGING
        next()
    }
}