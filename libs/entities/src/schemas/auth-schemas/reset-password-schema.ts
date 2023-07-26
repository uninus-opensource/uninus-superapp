import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class newPasswordSchema {
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
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password harus memiliki setidaknya 6 karakter dan mengandung setidaknya 1 huruf kecil, 1 huruf besar, dan 1 angka. Tidak boleh mengandung simbol ',
    }),
});

export type TNewPasswordSchema = z.infer<typeof newPasswordZodSchema>;
