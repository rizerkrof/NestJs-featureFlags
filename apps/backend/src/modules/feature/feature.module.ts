import { AdminResourceModule } from '@adminjs/nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeatureController } from './feature.controller';
import { Feature } from './feature.entity';
import { FeatureService } from './feature.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feature]), AdminResourceModule.forFeature([Feature])],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}
