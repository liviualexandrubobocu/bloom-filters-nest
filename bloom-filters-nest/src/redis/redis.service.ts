import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async addToCache(key: string, element: string): Promise<string> {
        return await this.redis.set(`cache:${key}`, element);
    }
    
    async checkInCache(key: string): Promise<string | null> {
        return await this.redis.get(`cache:${key}`);
    }

    async getRedisMemory(): Promise<number> {
        let memoryUsage = 0;
        for(let i = 0; i < 100000; i++){
            const info = await this.redis.call('MEMORY', 'USAGE', `cache:item-${i}`);
            memoryUsage += parseInt(info as string, 10);
        }
        return memoryUsage;
    }
}