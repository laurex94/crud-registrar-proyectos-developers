import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetProjectDto {
  @Field()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly description: string;

  @Field()
  @IsString()
  readonly status: string;
}

@InputType()
export class GetOneProjectInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
}

@InputType()
export class CreateProjectInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsString()
  readonly description: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  readonly id_status: number;
}

@InputType()
export class UpdateProjectInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  @Field({ nullable: true })
  @IsString()
  readonly name: string;

  @Field({ nullable: true })
  @IsString()
  readonly description: string;

  @Field({ nullable: true })
  @IsString()
  readonly idStatus: number;
}
