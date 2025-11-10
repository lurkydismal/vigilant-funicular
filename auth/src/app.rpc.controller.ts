import * as crypto from 'crypto';
import type Redis from 'ioredis';
import { Controller, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users/users.service';

@Controller()
export class AuthRpcController {
    constructor(
        private readonly jwt: JwtService,
        private readonly users: UsersService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
    ) { }

    @MessagePattern('auth.verify')
    async verify(@Payload() data: { token?: string }) {
        if (!data?.token) return { valid: false, error: 'no_token' };

        const tokenHash = crypto.createHash('sha256').update(data.token).digest('hex');
        const key = `auth:token:${tokenHash}`;

        // 1) check cache
        const cached = await this.redis.get(key);
        if (cached) {
            try { return JSON.parse(cached); } catch { /* fallthrough */ }
        }

        // 2) verify JWT and lookup user
        try {
            const payload = this.jwt.verify(data.token);

            const now = Math.floor(Date.now() / 1000);
            const exp = typeof payload?.exp === 'number' ? payload.exp : null;
            const remaining = exp ? Math.max(0, exp - now) : null;

            // cap TTL to avoid very long cached values (e.g. max 5 minutes)
            const MAX_TTL = 300; // seconds
            const ttl = remaining ? Math.min(remaining, MAX_TTL) : MAX_TTL;

            const id = Number(payload.sub);
            const user = await this.users.findById(id);
            if (!user) {
                const res = { valid: false, error: 'user_not_found' };
                await this.redis.set(key, JSON.stringify(res), 'EX', 30); // short cache for misses
                return res;
            }

            const res = { valid: true, user: { id: user.id, username: user.username } };
            await this.redis.set(key, JSON.stringify(res), 'EX', Math.max(1, ttl));
            return res;
        } catch (err: any) {
            const res = { valid: false, error: err?.name ?? 'invalid_token' };
            // cache invalid tokens briefly to reduce repeated decode attempts
            await this.redis.set(key, JSON.stringify(res), 'EX', 30);
            // return a small, stable error string clients can check
            return res;
        }
    }
}
