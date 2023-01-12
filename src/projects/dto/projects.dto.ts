import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { statusProject } from '../entities/projects.entity';

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
  readonly status: statusProject;
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
  @IsString()
  @IsNotEmpty()
  readonly status: statusProject;
}

@InputType()
export class UpdateProjectInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly description: string;

  @Field()
  @IsString()
  readonly status: statusProject;
}

@InputType()
export class DeleteProjectInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
}
