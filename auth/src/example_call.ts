import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

const client = ClientProxyFactory.create({
  options: {
    transport: Transport.RMQ,
    urls: [process.env.RABBITMQ_URL],
    queue: 'auth_rpc_queue',
    queueOptions: { durable: true },
  },
});

export async function verifyToken(token: string) {
  const reply = await lastValueFrom(client.send('auth.verify', { token }));
  return reply as {
    valid: boolean;
    user?: { id: number; username: string };
    error?: string;
  };
}
