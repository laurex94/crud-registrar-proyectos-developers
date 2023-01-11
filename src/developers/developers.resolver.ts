import { Float, Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { QueryDocumentKeys } from 'graphql/language/ast';
import { GetDeveloperDto } from './dto/developers.dto';
import { DevelopersService } from './developers.service';
import { Developer } from './entities/developers.entity';

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

  @Query(() => [Developer])
  async GetAllDevelopers() {
    return this.developersService.findAll();
  }
}
