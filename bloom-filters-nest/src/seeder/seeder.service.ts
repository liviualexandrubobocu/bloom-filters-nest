// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { CuckooFiltersService } from 'src/cuckoo-filters/cuckoo-filters.service';
import { RedisService } from 'src/redis/redis.service';
import { BloomFiltersService } from '../bloom-filters/bloom-filters.service';
import { ItemsService } from '../items/items.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly bloomFiltersService: BloomFiltersService,
    private readonly cuckooFiltersService: CuckooFiltersService,
    private readonly redisService: RedisService,
    private readonly itemsService: ItemsService,
  ) {}

  async seedDatabase(entries: number): Promise<string> {
    // Ensuring the Bloom filter is set up
    await this.bloomFiltersService.createFilter('categories:products', 0.01, entries);

    for (let i = 0; i < entries; i++) {
      const value = `item-${i}`;

      // Adding to Redis Bloom filter
      await this.bloomFiltersService.addElement('categories:products', value);

      await this.cuckooFiltersService.addElement('categories:products', value);

      await this.redisService.addToCache(value, value);

      // Adding to PostgreSQL
     // await this.itemsService.addItem(i, value);
    }

    return `Seeded ${entries} entries successfully.`;
  }
}
