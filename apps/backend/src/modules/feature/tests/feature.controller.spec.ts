import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@root/app.module';
import request from 'supertest';

import { FeatureService } from '../feature.service';

describe('FeatureController', () => {
  let app: INestApplication;
  let featureService: FeatureService;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();

    featureService = testingModule.get(FeatureService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Get - /features', () => {
    it('should return all feature flags', async () => {
      const featureFlagsData = [
        { name: 'feature1', isActive: true },
        { name: 'feature2', isActive: false },
      ];

      jest.spyOn(featureService, 'getAll').mockResolvedValue(featureFlagsData);

      await request(app.getHttpServer()).get('/features').expect(200).expect(featureFlagsData);
    });
  });
});
