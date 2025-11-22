// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     ManyToOne,
//     CreateDateColumn,
//     Index,
// } from 'typeorm';
// import { Post } from './post.entity';
//
// @Entity({ name: 'attachments' })
// export class Attachment {
//     @PrimaryGeneratedColumn('increment')
//     id!: number;
//
//     @ManyToOne(() => Post, (p) => p.attachments, { onDelete: 'CASCADE' })
//     @Index()
//     post!: Post;
//
//     @Column({ type: 'text' })
//     file_url!: string;
//
//     @Column({ type: 'varchar', length: 128 })
//     mime_type!: string;
//
//     @CreateDateColumn({ type: 'timestamp with time zone' })
//     created_at!: Date;
// }
