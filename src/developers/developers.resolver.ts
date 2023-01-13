import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  GetDeveloperDto,
  GetOneDeveloperInput,
  CreateDeveloperInput,
  UpdateDeveloperInput,
  AddDeveloperSpecialityOutput,
  AddDeveloperSpecialityInput,
} from './dto/developers.dto';
import { DevelopersService } from './developers.service';

@Resolver()
export class DevelopersResolver {
  constructor(private developersService: DevelopersService) {}

  @Query(() => String, {
    description: 'Hola developer, es lo que retorna',
    name: 'hola_developer',
  })
  helloDeveloper(): string {
    return 'Hola developer';
  }

  @Query(() => [GetDeveloperDto])
  async getAllDevelopers() {
    return await this.developersService.findAll();
  }

  @Query(() => GetDeveloperDto)
  async getDeveloperById(@Args('input') input: GetOneDeveloperInput) {
    return await this.developersService.findOne(input.id);
  }

  @Mutation(() => GetDeveloperDto)
  async createDeveloper(@Args('input') input: CreateDeveloperInput) {
    return await this.developersService.create(input);
  }

  @Mutation(() => GetDeveloperDto)
  async updateDeveloper(@Args('input') input: UpdateDeveloperInput) {
    return await this.developersService.update(input);
  }

  @Mutation(() => AddDeveloperSpecialityOutput)
  async AddDeveloperSpeciality(
    @Args('input') input: AddDeveloperSpecialityInput,
  ) {
    return await this.developersService.AddDeveloperSpeciality(input);
  }
}
