import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class newPasswordDto {
  @ApiProperty({
    example: '',
  })
  public email!: string;

  @ApiProperty({
    example: 'min length 6, upper case 1, numbers 1',
  })
  public password!: string;
}

export const newPasswordZodSchema = z.object({
  email: z.string().email({
    message: 'Email tidak valid',
  }),
  password: z
    .string()
    .nonempty({
      message: 'Password tidak boleh kosong',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
});

export type TNewPasswordSchema = z.infer<typeof newPasswordZodSchema>;
