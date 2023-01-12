import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  GetDeveloperDto,
  GetOneDeveloperInput,
  CreateDeveloperInput,
  UpdateDeveloperInput,
  DeleteDeveloperInput,
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
    return this.developersService.findAll();
  }

  @Query(() => GetDeveloperDto)
  async getDeveloperById(@Args('input') input: GetOneDeveloperInput) {
    return this.developersService.findOne(input.id);
  }

  @Mutation(() => GetDeveloperDto)
  async createDeveloper(@Args('input') input: CreateDeveloperInput) {
    return this.developersService.create(input);
  }

  @Mutation(() => GetDeveloperDto)
  async updateDeveloper(@Args('input') input: UpdateDeveloperInput) {
    return this.developersService.update(input);
  }

  @Mutation(() => GetDeveloperDto)
  async DeleteDeveloper(@Args('input') input: DeleteDeveloperInput) {
    return this.developersService.remove(input.id);
  }
}
