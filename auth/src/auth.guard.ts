import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.cookies?.accessToken; // read cookie
        if (!token) throw new UnauthorizedException('No access token');

        try {
            const obs = this.client.send('auth.verify', { token }).pipe(
                timeout(2000),
                catchError((err) => throwError(() => err)),
            );
            const result: { valid: boolean; user?: any; error?: string } = await firstValueFrom(obs);

            if (!result || !result.valid) {
                throw new UnauthorizedException(result?.error ?? 'Invalid token');
            }

            // attach user info from RPC to request
            request.user = result.user; // attach user info to request
            return true;
        } catch (err) {
            console.log(err);

            throw new UnauthorizedException('Invalid access token');
        }
    }
}
