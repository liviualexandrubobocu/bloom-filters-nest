import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  imports: [
  ],
  providers: [RedisService],
  exports: [RedisService], // Export the service if it needs to be used elsewhere
})
export class RedisImplModule {}