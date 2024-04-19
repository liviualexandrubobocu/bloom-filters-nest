// External
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Item } from './item.entity';

// Internal
@Injectable()
export class ItemsRepository
  extends Repository<Item>
{
  constructor(public dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }

  async createOne(item: Item): Promise<Item> {
    return await this.save(item);
  }

  async findAll(): Promise<Item[]> {
    return await this.find();
  }

  async findById(id: number): Promise<Item> {
    return await this.findOneBy({ id });
  }

  async updateOne(id: number, item: Partial<Item>): Promise<Item> {
    return this.save({ ...item, id });
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }
}