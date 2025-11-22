import axios from 'axios';
import FormData from 'form-data';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Profile)
        private repo: Repository<Profile>,
    ) { }

    private static cachedAvatars: string[] | null = null;

    private async getDefaultAvatars(): Promise<string[]> {
        if (UserService.cachedAvatars) return UserService.cachedAvatars;

        const avatarDir = join(__dirname, '..', 'static', 'images', 'avatar');
        const files = await fs.readdir(avatarDir);
        UserService.cachedAvatars = files.filter(f => !f.startsWith('.'));
        return UserService.cachedAvatars;
    }

    private async getRandomAvatarPath(): Promise<string> {
        const files = await this.getDefaultAvatars();
        if (!files.length) return 'dist/static/images/avatar/default.png';
        const random = files[Math.floor(Math.random() * files.length)];
        return `dist/static/images/avatar/${random}`;
    }

    async getProfileByUserId(userId: number) {
        return this.repo.findOne({ where: { userId } });
    }

    async saveProfile(userId: number, data: Partial<Profile> = {}) {
        let avatarUrl: string;

        if (!data.avatarUrl) {
            const avatarPath = await this.getRandomAvatarPath();

            const buffer = await fs.readFile(avatarPath);

            // Send the file to the media microservice
            const form = new FormData();
            form.append('file', buffer, { filename: avatarPath, contentType: 'image/jpeg' });

            const url = `http://media:3000/media/upload`;

            // send to Media Service
            const response = await axios.post(
                url,
                form,
                {
                    headers: form.getHeaders(), // necessary for multipart/form-data
                }
            );

            avatarUrl = response.data.key;

        } else {
            avatarUrl = data.avatarUrl;
        }

        await this.repo.upsert(
            { userId, ...data, avatarUrl },
            ['userId']
        );

        return this.repo.findOne({ where: { userId } });
    }

    async deleteProfileForUser(userId: number) {
        return this.repo.delete({ userId });
    }
}
