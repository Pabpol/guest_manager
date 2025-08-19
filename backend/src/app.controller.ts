import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('confirmado')
  getConfirmado() {
    return { message: 'Confirmado exitosamente' };
  }

  @Get('ya-confirmado') 
  getYaConfirmado() {
    return { message: 'Ya se encuentra confirmado' };
  }

  @Get('error')
  getError() {
    return { message: 'Error en la confirmación' };
  }
}
