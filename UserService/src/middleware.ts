import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const method = req.method;
    const url = req.originalUrl;
    const userAgent = req.get('user-agent');
    const time = new Date().toISOString();

    console.log(`NEW REQUEST [${time}] ${method} ${url} - IP: ${ip} - UserAgent: ${userAgent}`);

    next();
  }
}