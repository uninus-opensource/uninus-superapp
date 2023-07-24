import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class ReqUserDto {
  @ApiProperty({
    example: '',
  })
  public email!: string;

  @ApiProperty({
    example: '41037006280',
  })
  public nik!: string;
}

export const ReqUserZodSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
  nik: z.string(),
});

export type TReqUserSchema = z.infer<typeof ReqUserZodSchema>;
