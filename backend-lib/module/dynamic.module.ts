import { ClientsModule, Transport } from '@nestjs/microservices';

export function registerModule(name: string, transport: Transport | number, urls: string[], durable?: boolean) {
    return (
        ClientsModule.register([
            {
                name: `${name.toUpperCase()}_SERVICE`,
                transport,
                options: {
                    urls: urls,
                    queue: `${name.toLocaleLowerCase()}_rpc_queue`,
                    queueOptions: { durable },
                },
            },
        ])
    );
}
