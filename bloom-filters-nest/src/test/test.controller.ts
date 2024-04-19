// src/test/test.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { BloomFiltersService } from '../bloom-filters/bloom-filters.service';
import { ItemsService } from '../items/items.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly bloomFiltersService: BloomFiltersService,
    private readonly redisService: RedisService,
    private readonly itemsService: ItemsService,
  ) {}

  @Get('/check/:value')
  async checkExistence(@Param('value') value: string) {
    const startBloom = process.hrtime();
    const existsInBloom = await this.bloomFiltersService.checkElement('categories:products', value);
    const bloomDuration = process.hrtime(startBloom);
    

    const startCuckoo = process.hrtime();
    const existsInCuckoo = await this.bloomFiltersService.checkElement('categories:products', value);
    const cuckooDuration = process.hrtime(startCuckoo);

    const startRedisCache = process.hrtime();
    const existsInRedisCache = await this.redisService.checkInCache(value);
    const redisCacheDuration = process.hrtime(startRedisCache);

    const startDb = process.hrtime();
    const existsInDb = await this.itemsService.checkItemExists(value);
    const dbDuration = process.hrtime(startDb);

    return {
      existsInBloom,
      bloomDuration: bloomDuration[0] * 1e9 + bloomDuration[1], // nanoseconds
      existsInCuckoo,
      cuckooDuration: cuckooDuration[0] * 1e9 + cuckooDuration[1], // nanoseconds
      existsInRedisCache,
      redisCacheDuration: redisCacheDuration[0] * 1e9 + redisCacheDuration[1],
      existsInDb,
      dbDuration: dbDuration[0] * 1e9 + dbDuration[1], // nanoseconds
    };
  }
}
