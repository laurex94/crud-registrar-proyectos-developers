import { Module } from '@nestjs/common';
import { DevelopersResolver } from './developers.resolver';
import { DevelopersService } from './developers.service';
import { SpecialitiesService } from 'src/specialities/specialities.service';

@Module({
  providers: [DevelopersResolver, DevelopersService, SpecialitiesService],
  exports: [DevelopersService],
})
export class DevelopersModule {}
