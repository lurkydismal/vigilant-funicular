import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    // @EventPattern('user.created')
    // async handleUserCreated(data: { id: number; email: string }) {
    //   await this.userRepo.insert({ user_id: data.id });
    // }
}
