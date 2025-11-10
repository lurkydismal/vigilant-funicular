import Redis from 'ioredis';

export const RedisProvider = {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
        const url = process.env.REDIS_URL ?? 'redis://redis:6379';
        return new Redis(url);
    },
};
