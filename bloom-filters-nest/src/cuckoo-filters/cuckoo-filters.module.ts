// src/bloom-filters/bloom-filters.module.ts
import { Module } from '@nestjs/common';
import { CuckooFiltersService } from './cuckoo-filters.service';

@Module({
  imports: [
  ],
  providers: [CuckooFiltersService],
  exports: [CuckooFiltersService], // Export the service if it needs to be used elsewhere
})
export class CuckooFiltersModule {}