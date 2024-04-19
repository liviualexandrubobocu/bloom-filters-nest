// src/bloom-filters/bloom-filters.module.ts
import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'; // Ensure this is setup correctly in your project
import { BloomFiltersService } from './bloom-filters.service';

@Module({
  imports: [
    RedisModule.forRoot({
        type: 'single',
        url: 'redis://localhost:6379',
    }),
  ],
  providers: [BloomFiltersService],
  exports: [BloomFiltersService], // Export the service if it needs to be used elsewhere
})
export class BloomFiltersModule {}
