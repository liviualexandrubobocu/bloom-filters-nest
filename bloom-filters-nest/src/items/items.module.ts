// src/items/items.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { ItemsRepository } from './items.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),  // Registers the Item entity with TypeORM
  ],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsService, ItemsRepository]
})
export class ItemsModule {}
