import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post/post.entity';
// import { Attachment } from './post/attachment.entity';

@Injectable()
export class PostsRepository {
    constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        // @InjectRepository(Attachment) private readonly attachRepo: Repository<Attachment>,
        // private readonly dataSource: DataSource,
    ) { }

    async createPost(userId: number, content: string) {
        const l_post = this.postRepo.create({
            user_id: userId,
            content,
        });
        return this.postRepo.save(l_post);
    }

    // async addAttachment(postId: number, fileUrl: string, mimeType: string) {
    //     const l_post = await this.postRepo.findOne({ where: { id: postId } });
    //     if (!l_post) throw new Error('post not found');
    //     const l_attach = this.attachRepo.create({
    //         post: l_post,
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
            where: { user_id: userId },
            relations: ['attachments'],
            order: { created_at: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
}
