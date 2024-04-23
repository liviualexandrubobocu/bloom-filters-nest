import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { BloomFiltersService } from './bloom-filters.service';

@Controller('bloom-filters')
export class BloomFiltersController {
  constructor(private readonly bloomFiltersService: BloomFiltersService) {}

  @Post('/create')
  createFilter(@Body() body: { key: string; errorRate: number; initialSize: number }) {
    return this.bloomFiltersService.createFilter(body.key, body.errorRate, body.initialSize);
  }

  @Post('/add')
  addElement(@Body() body: { key: string; element: string }) {
    return this.bloomFiltersService.addElement(body.key, body.element);
  }

  @Get('/check')
  checkElement(@Query() query: { key: string; element: string }) {
    return this.bloomFiltersService.checkElement(query.key, query.element);
  }
}
