import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFileSync } from 'fs';

function hexToIp(hex: string): string {
    const bytes = hex.match(/../g)!.map(b => parseInt(b, 16));
    return `${bytes[3]}.${bytes[2]}.${bytes[1]}.${bytes[0]}`;
}

@Injectable()
export class NetworkService implements OnModuleInit {
    private gatewayIp: string | null = null;

    onModuleInit() {
        this.gatewayIp = this.getGatewayOnce();
    }

    private getGatewayOnce(): string | null {
        try {
            const data = readFileSync('/proc/net/route', 'utf8');
            const lines = data.trim().split('\n').slice(1);
            for (const line of lines) {
                const cols = line.trim().split(/\s+/);
                if (cols[1] !== '00000000') continue;      // default route
                return hexToIp(cols[2]);
            }
            return null;
        } catch {
            return null;
        }
    }

    getGateway(): string | null {
        return this.gatewayIp;
    }
}
