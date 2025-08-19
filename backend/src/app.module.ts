import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule } from './guest/guest.module';
import { Guest } from './guest/guest.model';
import { EmailService } from './email/email.service';
import { ExportService } from './export/export.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [Guest],
        autoLoadModels: true,
        synchronize: false, // Don't auto-sync in production
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
      exclude: ['/api*'],
    }),
    GuestModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, ExportService],
})
export class AppModule {}
