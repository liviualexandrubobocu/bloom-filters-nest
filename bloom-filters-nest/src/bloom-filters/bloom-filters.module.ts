import { Module } from '@nestjs/common';
import { BloomFiltersService } from './bloom-filters.service';

@Module({
  imports: [
  ],
  providers: [BloomFiltersService],
  exports: [BloomFiltersService], // Export the service if it needs to be used elsewhere
})
export class BloomFiltersModule {}
