import { Controller, Post, Query } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('/seed')
  async seedDatabase(@Query('entries') entries: string): Promise<string> {
    const entryCount = parseInt(entries) || 10000; // Default to 10,000 if not specified
    return await this.seederService.seedDatabase(entryCount);
  }
}
