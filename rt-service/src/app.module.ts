import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [],
    providers: [WebsocketGateway],
})
export class AppModule { }
