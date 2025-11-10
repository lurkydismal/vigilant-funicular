import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './app.service';
import { CreatePostDto } from './post/create-post.dto';

@Controller('posts')
export class AppController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async createPost(@Body() dto: CreatePostDto) {
        return this.postsService.createPost(dto);
    }
}
