import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Injectable, CanActivate, } from '@nestjs/common';
import { isDev, sendRequest } from '../stdfunc';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectPinoLogger(AuthGuard.name) private readonly logger: PinoLogger,
    ) { }

    async canActivate(): Promise<boolean> {
        if (isDev) {
            this.logger.debug("Auth verification skipped");

            return true;
        }

        try {
            await sendRequest(`auth/verify`, this.logger);

            return true;
        } catch {
            return false;
        }
    }
}
