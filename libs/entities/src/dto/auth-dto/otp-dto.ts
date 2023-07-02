import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class otpDto {

    @IsNotEmpty()
    @IsString()
    public email!: string;

    @IsNotEmpty()
    @IsInt()
    public otp!: string;

}