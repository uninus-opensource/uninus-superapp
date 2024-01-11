import { HttpException, InternalServerErrorException } from "@nestjs/common";

export const errorMappings = (error: Error) => {
  if (error instanceof HttpException) {
    return error;
  }
  console.log({
    timestamp: new Date().toISOString(),
    error: error?.message,
  });
  return new InternalServerErrorException(error.message);
};
