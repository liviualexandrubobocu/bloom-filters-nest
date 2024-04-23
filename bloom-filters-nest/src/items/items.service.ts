import { Injectable } from '@nestjs/common';
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
