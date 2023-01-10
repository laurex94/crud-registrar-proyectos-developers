import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class DevelopersResolver {
  @Query(() => String, {
    description: 'Hola developer, es lo que retorna',
    name: 'hola_developer',
  })
  helloDeveloper(): string {
    return 'Hola developer';
  }
}
