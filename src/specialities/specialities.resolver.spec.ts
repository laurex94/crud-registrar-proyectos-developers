import { Test, TestingModule } from '@nestjs/testing';
import { SpecialitiesResolver } from './specialities.resolver';

describe('SpecialitiesResolver', () => {
  let resolver: SpecialitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialitiesResolver],
    }).compile();

    resolver = module.get<SpecialitiesResolver>(SpecialitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
