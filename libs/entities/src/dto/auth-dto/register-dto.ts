import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class RegisterDto {
  @ApiProperty({
    description: 'NIK harus 16 Digit',
    minLength: 16,
    type: 'string',
  })
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
  nik: z
    .string()
    .min(16, {
      message: 'NIK harus 16 Digit',
    })
    .nonempty({
      message: 'NIK tidak boleh kosong',
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
  fullname: z.string().nonempty({
    message: 'Nama lengkap tidak boleh kosong',
  }),
  role_id: z.number().optional(),
});

export type TRegisterSchema = z.infer<typeof RegisterZodSchema>;
