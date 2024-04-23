import { Controller, Get, Param } from '@nestjs/common';
import { CuckooFiltersService } from 'src/cuckoo-filters/cuckoo-filters.service';
import { RedisService } from 'src/redis/redis.service';
import { BloomFiltersService } from '../bloom-filters/bloom-filters.service';
import { ItemsService } from '../items/items.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly bloomFiltersService: BloomFiltersService,
    private readonly cuckooFiltersService: CuckooFiltersService,
    private readonly redisService: RedisService,
    private readonly itemsService: ItemsService,
  ) {}

  @Get('/check/:value')
  async checkExistence(@Param('value') value: string) {
    const startBloom = process.hrtime();
    const existsInBloom = await this.bloomFiltersService.checkElement('categories:products', value);
    const bloomDuration = process.hrtime(startBloom);

    const startCuckoo = process.hrtime();
    const existsInCuckoo = await this.cuckooFiltersService.checkElement('categories:values', value);
    const cuckooDuration = process.hrtime(startCuckoo);

    const startRedisCache = process.hrtime();
    const existsInRedisCache = await this.redisService.checkInCache(value);
    const redisCacheDuration = process.hrtime(startRedisCache);

    const startDb = process.hrtime();
    const existsInDb = await this.itemsService.checkItemExists(value);
    const dbDuration = process.hrtime(startDb);

    const bloomFiltersMemory = await this.bloomFiltersService.getBloomFilterMemory() / 1024;
    const cuckooFiltersMemory = await this.cuckooFiltersService.getCuckooFilterMemory() / 1024;
    const redisMemory = await this.redisService.getRedisMemory() / 1024;

    return {
        bloom: {
            message: `The search for an element when seeding the db with 100 000 items is ${bloomDuration[0] * 1e9 + bloomDuration[1] / 1e6} ms for Bloom filter and the memory used is ${bloomFiltersMemory} kb.`,
            exists: existsInBloom,
        },
        cuckoo: {
            message: `The search for an element when seeding the db with 100 000 items is ${cuckooDuration[0] * 1e9 + cuckooDuration[1] / 1e6} ms for Cuckoo filter and the memory used is ${cuckooFiltersMemory} kb.`,
            exists: existsInCuckoo,
        },
        redisCache: {
            message: `The search for an element when seeding the db with 100 000 items is ${redisCacheDuration[0] * 1e9 + redisCacheDuration[1] / 1e6} ms for Redis cache and the memory used is ${redisMemory} kb.`,
            exists: existsInRedisCache,
        },
        db: {
            message: `The search for an element when seeding the db with 100 000 items is ${dbDuration[0] * 1e9 + dbDuration[1] / 1e6} ms for the database.`,
            exists: existsInDb,
        }
    };
  }
}
