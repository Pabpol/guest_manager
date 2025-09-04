import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule } from './guest/guest.module';
import { EmailService } from './email/email.service';
import { ExportService } from './export/export.service';
import { Guest } from './guest/guest.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // SQLite in-memory database configuration with TypeORM
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:', // This creates an in-memory database
      entities: [Guest],
      synchronize: true, // Auto-create tables
      logging: false, // Disable SQL logging for cleaner output
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
export class AppModule { }
