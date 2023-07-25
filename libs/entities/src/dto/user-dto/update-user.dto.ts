import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateUserDto {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public nik!: string;

  @ApiProperty()
  public fullname!: string;

  @ApiProperty({
    example: 'min length 6, upper case 1, numbers 1',
  })
  public password!: string;

  @ApiProperty()
  public role_id!: number;

  @ApiProperty()
  public photo!: string;
}

export const UpdateUserZodSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
  nik: z.string().nonempty({
    message: 'NIK tidak boleh kosong',
  }),
  fullname: z.string().nonempty({
    message: 'Nama lengkap tidak boleh kosong',
  }),
  password: z
    .string()
    .nonempty({
      message: 'Password tidak boleh kosong',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
  role_id: z.number().optional(),
  photo: z.string().optional(),
});
