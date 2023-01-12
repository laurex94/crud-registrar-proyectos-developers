import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { DevelopersService } from 'src/developers/developers.service';

@Module({
  providers: [ProjectsResolver, ProjectsService, DevelopersService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
