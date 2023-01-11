import { Float, Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { GetDeveloperDto, GetOneDeveloperInput } from './dto/developers.dto';
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
  async GetAllDevelopers() {
    return this.developersService.findAll();
  }

  @Query(() => GetDeveloperDto)
  async GetDeveloperById(@Args('input') input: GetOneDeveloperInput) {
    return this.developersService.findOne(input.id);
  }
}
