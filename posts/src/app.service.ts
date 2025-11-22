import { ClientProxy } from '@nestjs/microservices';
import { CreatePostDto } from './post/create-post.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor(
        @InjectPinoLogger(PostsService.name) private readonly logger: PinoLogger,
        private readonly repo: PostsRepository,
        @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
    ) { }

    async createPost(dto: CreatePostDto) {
        const post = await this.repo.createPost(dto.user_id, dto.tag_name, dto.title, dto.description, dto.content);

        try {
            this.client.emit('post.created', { postId: post.id, userId: post.userId });
            this.logger.trace(post, 'post.created event emitted');
        } catch (err) {
            this.logger.error({ err, post: post }, 'Emitting post.created event');
        }

        return post;
    }

    async getPosts() {
        return await this.repo.getPosts();
    }
}
