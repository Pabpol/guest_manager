import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GuestModule } from './guest/guest.module';
import { GuestEntity } from './guest/guest.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'guest_manager',
      entities: [GuestEntity],
      synchronize: true,
    }),
    GuestModule,
  ],
})
export class AppModule {}
