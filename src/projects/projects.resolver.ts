import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  GetProjectDto,
  GetOneProjectInput,
  CreateProjectInput,
  UpdateProjectInput,
  AddProjectSpecialityOutput,
  AddProjectSpecialityInput,
  findProjBySpecIdOutput,
  AddProjectDeveloperInput,
  AddProjectDeveloperOutput,
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

  @Mutation(() => AddProjectSpecialityOutput)
  async AddProjectSpeciality(@Args('input') input: AddProjectSpecialityInput) {
    return await this.projectsService.AddProjectSpeciality(input);
  }

  @Query(() => [findProjBySpecIdOutput])
  async findProjBySpecId(@Args('input') input: GetOneProjectInput) {
    return await this.projectsService.findProjBySpecId(input.id);
  }

  @Query(() => [findProjBySpecIdOutput])
  async findProjByStatusId(@Args('input') input: GetOneProjectInput) {
    return await this.projectsService.findProjByStatusId(input.id);
  }

  @Mutation(() => [AddProjectDeveloperOutput])
  async AddProjectDeveloper(@Args('input') input: AddProjectDeveloperInput) {
    return await this.projectsService.AddProjectDeveloper(input);
  }
}
