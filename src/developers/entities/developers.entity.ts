import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Developer {
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
