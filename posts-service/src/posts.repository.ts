// import { Attachment } from './post/attachment.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Post } from './post/post.entity';
import { Repository } from 'typeorm';
import { Tag } from './post/tag.entity';

@Injectable()
export class PostsRepository {
    constructor(
        @InjectPinoLogger(PostsRepository.name) private readonly logger: PinoLogger,
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
        // @InjectRepository(Attachment) private readonly attachRepo: Repository<Attachment>,
        // private readonly dataSource: DataSource,
    ) { }

    async createPost(userId: number, tagName: string, title: string, description: string, content: string) {
        const tag = await this.tagRepo.findOne({ where: { name: tagName } });

        if (!tag) {
            this.logger.error({ userId, tagName, title }, 'Finding one tag id by name');

            throw new InternalServerErrorException('Failed to find tag');
        }

        const post = this.postRepo.create({
            userId,
            tag,
            title,
            description,
            content,
        });

        return this.postRepo.save(post);
    }

    async getPosts() {
        const posts = this.postRepo
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.tag', 't')
            .orderBy('p.created_at', 'DESC')
            .getMany();

        return posts;
    }

    // async addAttachment(postId: number, fileUrl: string, mimeType: string) {
    //     const post = await this.postRepo.findOne({ where: { id: postId } });
    //     if (!post) throw new Error('post not found');
    //     const l_attach = this.attachRepo.create({
    //         post: post,
    //         file_url: fileUrl,
    //         mime_type: mimeType,
    //     });
    //     return this.attachRepo.save(l_attach);
    // }

    // async createPostWithAttachments(userId: number, content: string) { // , attachments: { url: string; mime: string }[]
    //     return this.dataSource.transaction(async (manager) => {
    //         const post = manager.create(Post, { user_id: userId, content });
    //         const savedPost = await manager.save(post);
    //         for (const a of attachments) {
    //             const attach = manager.create(Attachment, { post: savedPost, file_url: a.url, mime_type: a.mime });
    //             await manager.save(attach);
    //         }
    //         return manager.findOne(Post, { where: { id: savedPost.id }, relations: ['attachments'] });
    //     });
    // }

    async findById(id: number) {
        return this.postRepo.findOne({ where: { id }, relations: ['attachments'] });
    }

    async findByUser(userId: number, limit = 20, offset = 0) {
        return this.postRepo.find({
            where: { userId: userId },
            relations: ['attachments'],
            order: { created_at: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
}
