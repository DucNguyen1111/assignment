import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger('Exception');

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorCode = '';

    if (typeof message === 'string') {
      errorCode = message.replace('error.', '');
    }

    if (typeof message === 'object') {
      errorCode = 'INVALID_PARAM';
    }

    this.logger.log(`[Exception] - ${message[`message`]}`, message);
    // eslint-disable-next-line no-console
    // console.trace('Log Trace', exception);

    if (status === HttpStatus.NOT_FOUND) {
      response.status(status).json('Not found');
    } else
      response.status(status).json({
        statusCode: status,
        data: null,
        errorMessage: message,
        errorCode,
        timestamp: new Date().toISOString(),
      });
  }
}
