import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';
import moment from 'moment-timezone';
import { Request, Response, NextFunction } from 'express';

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.printf((info) => {
          if (info.stack) {
            return `${info.stack}`;
          }
          return `${info.message}`;
        })
      ),
    }),
    new transports.File({
      filename: `logs/error/${moment().format('MMM-DD-YYYY')}.log`,
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${info.timestamp}: ${info.stack}`)
      ),
    }),
    new transports.File({
      filename: `logs/info/${moment().format('MMM-DD-YYYY')}.log`,
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${info.timestamp}: ${info.message}`)
      ),
    }),
  ],
});

const morganMiddleware = morgan('dev', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
});

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  morganMiddleware(req, res, next);
}
export { logger };
