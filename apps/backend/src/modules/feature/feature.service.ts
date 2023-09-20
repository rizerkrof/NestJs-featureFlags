import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feature } from './feature.entity';
import GetFeatureDto from './interfaces/GetFeatureDto';

@Injectable()
export class FeatureService {
  constructor(@InjectRepository(Feature) private readonly featureRepository: Repository<Feature>) {}

  getAll = async (): Promise<GetFeatureDto[]> => {
    return await this.featureRepository.find();
  };
}
