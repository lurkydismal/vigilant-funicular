import {
    // OneToMany,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
// import { Attachment } from './attachment.entity';

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int', name: 'user_id' })
    @Index()
    userId!: number;

    @ManyToOne(() => Tag, tag => tag.posts)
    @JoinColumn({ name: 'tag_id' })
    tag!: Tag;

    @Column({ type: 'text' })
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'text' })
    content!: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at!: Date;

    // @OneToMany(() => Attachment, (a) => a.post, { cascade: true })
    // attachments?: Attachment[];
}

// TODO: Implement attachments
