import { Module } from '@nestjs/common';
import { SpecialitiesResolver } from './specialities.resolver';
import { SpecialitiesService } from './specialities.service';

@Module({
  providers: [SpecialitiesResolver, SpecialitiesService]
})
export class SpecialitiesModule {}
