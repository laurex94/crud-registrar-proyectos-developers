import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';

@Module({
  providers: [ProjectsResolver]
})
export class ProjectsModule {}
