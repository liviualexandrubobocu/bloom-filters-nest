// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    private itemsRepository: ItemsRepository,
  ) {
  }

  async checkItemExists(value: string): Promise<boolean> {
    const count = await this.itemsRepository.count({
      where: { value },
    });
    return count > 0;
  }

  async addItem(id: number, value: string): Promise<void> {
    await this.itemsRepository.createOne({ id, value });
  }
}
