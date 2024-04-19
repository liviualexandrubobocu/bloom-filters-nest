// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { BloomFiltersModule } from '../bloom-filters/bloom-filters.module'; // Assuming you have this module
import { ItemsModule } from '../items/items.module'; // Assuming you have this module
import { RedisImplModule } from 'src/redis/redis.module';
import { CuckooFiltersModule } from 'src/cuckoo-filters/cuckoo-filters.module';

@Module({
  imports: [BloomFiltersModule, CuckooFiltersModule, RedisImplModule, ItemsModule],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
