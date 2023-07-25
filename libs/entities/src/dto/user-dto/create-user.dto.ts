import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateUserDto {
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
}

export const CreateUserZodSchema = z.object({
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
});

export type TCreateUserSchema = z.infer<typeof CreateUserZodSchema>;
