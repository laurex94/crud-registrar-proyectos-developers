import { Module } from '@nestjs/common';
import { DevelopersResolver } from './developers.resolver';

@Module({
  providers: [DevelopersResolver]
})
export class DevelopersModule {}
