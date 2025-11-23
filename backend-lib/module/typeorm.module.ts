import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvUrl, isDev } from '../stdfunc';

// TODO: Better type
export function registerTypeORM(entities: any[]) {
    return (
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: getEnvUrl('DATABASE'),
            entities,
            autoLoadEntities: true,
            synchronize: isDev,
        })
    );
}
