import { Expose } from 'class-transformer';

export class UserDto {
    @Expose() id!: number;
    @Expose() username!: string;

    // static fromEntity(e: any) {
    //   return new UserDto(Object.assign({}, e));
    // }
}
