// src/bloom-filters/bloom-filters.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class CuckooFiltersService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addElement(key: string, element: string): Promise<void> {
    await this.redis.call('CF.ADD', key, element);
  }

  async checkElement(key: string, element: string): Promise<boolean> {
    return (await this.redis.call('CF.EXISTS', key, element)) === 1;
  }

  async createFilter(key: string, initialSize: number): Promise<void> {
    await this.redis.call('CF.RESERVE', key, initialSize);
  }

  async getCuckooFilterMemory(): Promise<number> {
    const info = await this.redis.call('MEMORY', 'USAGE', 'categories:values');
    return parseInt(info as string, 10);
  }
}
