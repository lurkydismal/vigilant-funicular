import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    name!: string;

    @OneToMany(() => Post, post => post.tag)
    posts: Post[];
}
