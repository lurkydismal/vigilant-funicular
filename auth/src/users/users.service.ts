import * as argon2 from 'argon2';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectPinoLogger(UsersService.name) private readonly logger: PinoLogger,
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    // Accept plain password and hash here. Do NOT hash twice.
    async createUser(data: { username: string; password: string }) {
        const passwordHash = await argon2.hash(data.password);

        const user = this.repo.create({
            username: data.username,
            passwordHash,
        });

        try {
            return await this.repo.save(user); // returns saved entity
        } catch (err: any) {
            // Postgres unique violation code is 23505
            if (err?.driverError?.code === '23505' || err?.code === '23505') {
                throw new ConflictException('Username is already in use');
            }
            throw err;
        }
    }

    async findByUsername(username: string) {
        const user = await this.repo.findOne({ where: { username } });

        if (!user) {
            const message = 'Failed to find user by id';

            this.logger.error(message);

            throw new InternalServerErrorException(message);
        }

        return user;
    }

    async findById(id: number) {
        const user = await this.repo.findOne({ where: { id } });

        if (!user) {
            const message = 'Failed to find user by id';

            this.logger.error(message);

            throw new InternalServerErrorException(message);
        }

        return user;
    }

    sanitize(user: User) {
        const { passwordHash, ...rest } = user;

        return rest;
    }
}
