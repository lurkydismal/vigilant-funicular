import {
    WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@WebSocketGateway({
    cors: { origin: '*' },
})
@Injectable()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    @WebSocketServer() server: Server;
    private channel: amqp.Channel;

    async onModuleInit() {
        const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:rabbitmq@rabbitmq:5672');
        this.channel = await conn.createChannel();
        await this.channel.assertQueue('events', { durable: false });

        this.channel.consume('events', (msg) => {
            if (!msg) return;
            const payload = JSON.parse(msg.content.toString());
            this.server.emit(payload.type, payload.data);
            this.channel.ack(msg);
        });
    }

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }
}
