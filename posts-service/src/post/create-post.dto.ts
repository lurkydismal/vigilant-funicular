import {
    IsInt,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreatePostDto {
    @IsInt()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    tag_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    description: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
