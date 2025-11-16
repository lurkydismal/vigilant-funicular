import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getEnvVar } from 'stdfunc';

function getEnvJWTVar(name: string) {
    return getEnvVar(`JWT_${name}`);
}

function registerJWT() {
    const secret = getEnvJWTVar('SECRET');

    const expiresInEnvName = 'EXPIRES_IN'

    const expiresIn = Number(getEnvJWTVar(expiresInEnvName));

    if (Number.isNaN(expiresIn)) {
        throw new Error(`JWT_${expiresInEnvName} is NaN`);
    }

    return (
        JwtModule.register({
            secret,
            signOptions: { expiresIn },
        })
    );
}

@Module({
    imports: [
        registerJWT(),
    ],
})
export class JWTModule { }
