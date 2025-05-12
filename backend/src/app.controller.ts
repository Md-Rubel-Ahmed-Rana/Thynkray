import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppResponseDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    description: "To check whether server is running or not",
    type: AppResponseDto
  })
  @Get('/health')
  getHello() {
    return this.appService.getHello();
  }
}
