import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
    // @IsOptional()
    // @IsString()
    // @MaxLength(120)
    // displayName?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    avatarUrl?: string;
}
