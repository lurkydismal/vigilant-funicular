import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    // OneToMany,
    // ManyToOne,
    Index,
} from 'typeorm';
// import { Attachment } from './attachment.entity';

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int' })
    @Index()
    user_id!: number;

    @Column({ type: 'text' })
    content!: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at!: Date;

    // @OneToMany(() => Attachment, (a) => a.post, { cascade: true })
    // attachments?: Attachment[];
}

// TODO: Implement attachments
