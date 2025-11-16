import Redis from 'ioredis';
import { getEnvUrl } from 'stdfunc';

function getRedisUrl() {
    return getEnvUrl('REDIS');
}

export const RedisProvider = {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
        const url = getRedisUrl();

        return new Redis(url);
    },
};
