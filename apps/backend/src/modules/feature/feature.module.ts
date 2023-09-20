import { AdminResourceModule } from '@adminjs/nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Feature } from './feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature]), AdminResourceModule.forFeature([Feature])],
})
export class FeatureModule {}
