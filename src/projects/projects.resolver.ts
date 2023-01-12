import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  GetProjectDto,
  GetOneProjectInput,
  CreateProjectInput,
  UpdateProjectInput,
  DeleteProjectInput,
} from './dto/projects.dto';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query(() => [GetProjectDto])
  async getAllProjects() {
    return this.projectsService.findAll();
  }

  @Query(() => GetProjectDto)
  async getProjectById(@Args('input') input: GetOneProjectInput) {
    return this.projectsService.findOne(input.id);
  }

  @Mutation(() => GetProjectDto)
  async createProject(@Args('input') input: CreateProjectInput) {
    return this.projectsService.create(input);
  }

  @Mutation(() => GetProjectDto)
  async updateProject(@Args('input') input: UpdateProjectInput) {
    return this.projectsService.update(input);
  }

  @Mutation(() => GetProjectDto)
  async DeleteProject(@Args('input') input: DeleteProjectInput) {
    return this.projectsService.remove(input.id);
  }
}
