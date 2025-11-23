import * as argon2 from 'argon2';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectRepository } from '@nestjs/typeorm';
import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // Accept plain password and hash here. Do NOT hash twice.
    async createUser(data: { username: string; password: string }) {
        const passwordHash = await argon2.hash(data.password);

        const user = this.userRepository.create({
            username: data.username,
            passwordHash,
        });

        try {
            // Returns saved entity
            return await this.userRepository.save(user);
        } catch (err: any) {
            // Postgres unique violation code is 23505
            if (err?.driverError?.code === '23505' || err?.code === '23505') {
                throw new ConflictException('Username is already in use');
            }

            throw err;
        }
    }

    async findOneByUsername(username: string) {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            const message = 'Failed to find user by id';

            this.logger.error(message);

            throw new InternalServerErrorException(message);
        }

        return user;
    }

    async findOneById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            const message = 'Failed to find user by id';

            this.logger.error(message);

            throw new InternalServerErrorException(message);
        }

        return user;
    }

    async findManyByIds(ids: number[]) {
        if (ids.length === 0) {
            const message = 'ids is empty';

            this.logger.warn(message);

            return [];
        }

        return this.userRepository.find({
            where: { id: In(ids) },
        });
    }

    sanitize(user: User) {
        const { passwordHash, ...rest } = user;

        return rest;
    }
}
