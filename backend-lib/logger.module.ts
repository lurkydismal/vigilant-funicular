import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { isDev, needTrace } from './stdfunc';

const logLevel = needTrace ? 'trace' : (isDev ? 'debug' : 'info');

@Module({
    imports: [
        LoggerModule.forRoot({
            pinoHttp: {
                level: logLevel,
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: 'SYS:standard',
                    },
                },
            },
        }),
    ],
})
export class LogModule { }
