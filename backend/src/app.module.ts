import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule } from './guest/guest.module';
import { EmailService } from './email/email.service';
import { ExportService } from './export/export.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Commented out database for demo
    /*
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'guest_manager'),
        models: [Guest],
        autoLoadModels: true,
        synchronize: false,
        logging: false, // Disable SQL logging
        // Retry connection options
        retry: {
          max: 3
        },
        // Don't fail app if DB is not available
        dialectOptions: {
          connectTimeout: 5000,
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 5000,
          idle: 10000
        }
      }),
      inject: [ConfigService],
    }),
    */
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
