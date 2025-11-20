import { JwtService } from '@nestjs/jwt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { UserService } from '../user/user.service';
import type Redis from 'ioredis';
import * as crypto from 'crypto';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, } from '@nestjs/common';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectPinoLogger(AuthGuard.name) private readonly logger: PinoLogger,
        private readonly jwt: JwtService,
        private readonly user: UserService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
    ) { }

    private async verify(token?: string) {
        if (!token) {
            return { valid: false, error: 'no_token' };
        }

        const tokenHash = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        const key = `auth:token:${tokenHash}`;

        // 1) check cache
        const cached = await this.redis.get(key);

        if (cached) {
            try {
                return JSON.parse(cached);
            } catch {
                /* fallthrough */
            }
        }

        // 2) verify JWT and lookup user
        try {
            const payload = this.jwt.verify(token);

            const now = Math.floor(Date.now() / 1000);
            const exp = typeof payload?.exp === 'number' ? payload.exp : null;
            const remaining = exp ? Math.max(0, exp - now) : null;

            // cap TTL to avoid very long cached values (e.g. max 5 minutes)
            const MAX_TTL = 300; // seconds
            const ttl = remaining ? Math.min(remaining, MAX_TTL) : MAX_TTL;

            const id = Number(payload.sub);
            const user = await this.user.findOneById(id);

            if (!user) {
                const res = { valid: false, error: 'user_not_found' };

                await this.redis.set(key, JSON.stringify(res), 'EX', 30); // short cache for misses

                return res;
            }

            const res = {
                valid: true,
                user: { id: user.id, username: user.username },
            };

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

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.cookies?.accessToken;

        if (!token) throw new UnauthorizedException('No access token');

        try {
            const result = await this.verify(token);

            if (!result || !result.valid) {
                throw new UnauthorizedException(result?.error ?? 'Invalid token');
            }

            // attach user info from RPC to request
            request.user = result.user; // attach user info to request

            return true;
        } catch (err) {
            this.logger.error({ err });

            throw new UnauthorizedException('Invalid access token');
        }
    }
}
