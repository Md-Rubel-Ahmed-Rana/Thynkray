import { Controller, Get, Query } from '@nestjs/common';
import { GlobalNewsService } from './global-news.service';
import { GetGlobalNewsDto, GlobalNewsResponseDto } from './dto/get-global-new.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('global-news')
export class GlobalNewsController {
  constructor(private readonly globalNewsService: GlobalNewsService) {}

  @ApiOkResponse({
    description: "Find international news from external api: newsapi",
    type: GlobalNewsResponseDto
  })
  @Get()
  findAll(@Query() query: GetGlobalNewsDto) {
    return this.globalNewsService.findAll(query);
  }
 
}
