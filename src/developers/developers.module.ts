import { Module } from '@nestjs/common';
import { DevelopersResolver } from './developers.resolver';
import { DevelopersService } from './developers.service';

@Module({
  providers: [DevelopersResolver, DevelopersService]
})
export class DevelopersModule {}
