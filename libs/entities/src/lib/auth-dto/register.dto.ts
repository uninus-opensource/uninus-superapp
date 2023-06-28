import {IsNotEmpty, IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterDto {
    // Sign in payload format
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email!: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    public password!: string;

    @IsString()
    @IsNotEmpty()
    public fullname!: string;

    @IsString()
    @IsNotEmpty()
    public nik!: string;
}