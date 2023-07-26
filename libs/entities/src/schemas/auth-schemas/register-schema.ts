import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class RegisterSchema {
  @ApiProperty()
  public fullname!: string;

  @ApiProperty({
    description: 'Email tidak valid',
    type: 'string',
    format: 'email',
  })
  public email!: string;

  @ApiProperty({
    description: 'Password harus lebih dari 6 karakter',
    minLength: 6,
    type: 'string',
  })
  public password!: string;

  @ApiProperty()
  public phone_number!: string;

  @ApiProperty()
  public role_id!: number;
}

export const RegisterZodSchema = z.object({
  fullname: z.string().nonempty({
    message: 'Nama lengkap tidak boleh kosong',
  }),
  email: z
    .string()
    .email({
      message: 'Email tidak vaild',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
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

  phone_number: z.string().nonempty(),
  role_id: z.number().optional(),
});

export type TRegisterSchema = z.infer<typeof RegisterZodSchema>;
