import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './post/create-post.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PostsService } from './app.service';

@Controller('posts')
export class AppController {
    constructor(
        @InjectPinoLogger(AppController.name) private readonly logger: PinoLogger,
        private readonly postsService: PostsService
    ) { }

    @Post('create')
    async createPost(@Body() dto: CreatePostDto) {
        this.logger.trace(dto, 'Post creation request');

        return this.postsService.createPost(dto);
    }

    @Post('get')
    async getPosts() {
        this.logger.trace('Posts get request');

        return this.postsService.getPosts();
    }
}
