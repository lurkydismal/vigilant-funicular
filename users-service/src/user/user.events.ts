import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserEventsController {
    constructor(private svc: UserService) { }

    @EventPattern('user.created')
    async handleUserCreated(@Payload() data: { id: number }) {
        await this.svc.saveProfile(data.id);
    }

    @EventPattern('user.deleted')
    async handleUserDeleted(@Payload() data: { id: number }) {
        await this.svc.deleteProfileForUser(data.id);
    }
}
