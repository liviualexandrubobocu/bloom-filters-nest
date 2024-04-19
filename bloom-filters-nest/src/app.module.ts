import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { SeederModule } from './seeder/seeder.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ItemsModule,
    DatabaseModule,
    SeederModule,
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
