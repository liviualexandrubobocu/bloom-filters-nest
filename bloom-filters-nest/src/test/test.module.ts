import { Module } from '@nestjs/common';
import { BloomFiltersService } from 'src/bloom-filters/bloom-filters.service';
import { CuckooFiltersService } from 'src/cuckoo-filters/cuckoo-filters.service';
import { ItemsRepository } from 'src/items/items.repository';
import { ItemsService } from 'src/items/items.service';
import { RedisService } from 'src/redis/redis.service';
import { TestController } from './test.controller';

@Module({
    providers: [ItemsService, ItemsRepository, BloomFiltersService, CuckooFiltersService, RedisService],
    controllers: [TestController],
})
export class TestModule {}
