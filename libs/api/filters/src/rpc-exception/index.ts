import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
@Catch(RpcException)
export class RpcExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getError() && Object.values(exception.getError());

    const statusCode =
      error && error.length === 3 && typeof error[2] === "number"
        ? error[2]
        : HttpStatus.BAD_REQUEST;

    response.status(statusCode).json(
      exception.getError()
        ? exception.getError()
        : {
            message: "Something bad happened",
            statusCode: 500,
          },
    );
  }
}
