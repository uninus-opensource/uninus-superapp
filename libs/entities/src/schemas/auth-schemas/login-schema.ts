import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class LoginSchema {
  @ApiProperty({
    example: '',
  })
  public email!: string;

  @ApiProperty({
    example: 'min length 6, upper case 1, numbers 1',
  })
  public password!: string;
}

export const LoginZodSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
  password: z.string().nonempty({
    message: 'Password tidak boleh kosong',
  }),
});

export type TLoginSchema = z.infer<typeof LoginZodSchema>;
