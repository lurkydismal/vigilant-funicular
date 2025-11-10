import {
    Entity,
    Column,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
    @PrimaryColumn({ name: 'user_id', type: 'int' })
    userId: number;

    // @Column({ name: 'display_name', type: 'text', nullable: true })
    // displayName?: string;

    @Column({ name: 'avatar_url', type: 'text', nullable: true })
    avatarUrl?: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt?: Date;
}
