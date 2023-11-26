import { BadRequestException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@uninus/api/services";

export const errorMappings = (error: Error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return new BadRequestException(error?.meta?.["cause"]);
  }
  if (error instanceof HttpException) {
    return error;
  }
  console.log({
    timestamp: new Date().toISOString(),
    error: error?.message,
  });
  return new InternalServerErrorException(error.message);
};
