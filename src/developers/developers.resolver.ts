import { Float, Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { QueryDocumentKeys } from 'graphql/language/ast';

@Resolver()
export class DevelopersResolver {
  @Query(() => String, {
    description: 'Hola developer, es lo que retorna',
    name: 'hola_developer',
  })
  helloDeveloper(): string {
    return 'Hola developer';
  }

  @Query(() => Float, { name: 'ramdonNumber' })
  getRamdonNumber(): number {
    return Math.random() * 100;
  }
}
