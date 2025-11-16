import { IsString, MinLength, MaxLength, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
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
