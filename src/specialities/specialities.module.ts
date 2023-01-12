import { Module } from '@nestjs/common';
import { SpecialitiesResolver } from './specialities.resolver';
import { SpecialitiesService } from './specialities.service';

@Module({
  providers: [SpecialitiesResolver, SpecialitiesService],
  exports: [SpecialitiesService],
})
export class SpecialitiesModule {}
