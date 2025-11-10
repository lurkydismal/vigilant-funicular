import { IsString, MinLength, MaxLength, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @IsBoolean()
    @IsOptional()
    rememberMe?: boolean;
}
