import { Module } from '@nestjs/common';
import { SpecialitiesResolver } from './specialities.resolver';

@Module({
  providers: [SpecialitiesResolver]
})
export class SpecialitiesModule {}
