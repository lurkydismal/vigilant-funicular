import { IsInt, IsString, Length, Min } from 'class-validator';

export class CreatePostDto {
    @IsInt()
    @Min(1)
    user_id!: number;

    @IsString()
    @Length(1, 5000)
    content!: string;
}
