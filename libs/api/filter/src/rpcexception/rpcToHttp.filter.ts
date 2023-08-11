import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // You can further customize the status code and the response based on the exception message or error code
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
