import { Catch, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { TRpcException } from "@uninus/entities";

@Catch(RpcException)
export class RpcExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: TRpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception;
    response.status(error.status).json({
      statusCode: error.status,
      message: error.message,
    });
  }
}
