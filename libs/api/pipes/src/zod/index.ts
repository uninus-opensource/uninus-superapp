import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { z } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.Schema<unknown>) {}

  transform(value: unknown) {
    const validationResult = this.schema.safeParse(value);

    if (!validationResult.success) {
      throw new BadRequestException(validationResult);
    } else {
      return value;
    }
  }
}
