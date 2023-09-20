import { Controller } from '@decorators/controller';
import { Get } from '@decorators/httpDecorators';

import { FeatureService } from './feature.service';
import GetFeatureDto from './interfaces/GetFeatureDto';

@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get({ isPublic: true })
  getAll(): Promise<GetFeatureDto[]> {
    return this.featureService.getAll();
  }
}
