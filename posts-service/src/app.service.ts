import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './post/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        private readonly repo: PostsRepository,
        @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
    ) { }

    async createPost(dto: CreatePostDto) {
        const post = await this.repo.createPost(dto.user_id, dto.content);
        this.client.emit('post.created', { postId: post.id, userId: post.user_id });
        return post;
    }
}
