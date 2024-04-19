// src/bloom-filters/bloom-filters.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class BloomFiltersService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addElement(key: string, element: string): Promise<void> {
    await this.redis.call('BF.ADD', key, element);
  }

  async checkElement(key: string, element: string): Promise<boolean> {
    return (await this.redis.call('BF.EXISTS', key, element)) === 1;
  }

  async createFilter(key: string, errorRate: number, initialSize: number): Promise<void> {
    await this.redis.call('BF.RESERVE', key, errorRate, initialSize);
  }
}
