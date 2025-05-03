import { Controller, Get, Query } from '@nestjs/common';
import { GlobalNewsService } from './global-news.service';
import { GetGlobalNewsDto } from './dto/get-global-new.dto';

@Controller('global-news')
export class GlobalNewsController {
  constructor(private readonly globalNewsService: GlobalNewsService) {}

  @Get()
  findAll(@Query() query: GetGlobalNewsDto) {
    return this.globalNewsService.findAll(query);
  }
 
}
