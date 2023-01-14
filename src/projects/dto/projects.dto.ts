import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
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
  readonly id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly id_status: number;
}

@InputType()
export class AddProjectSpecialityInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id_project: number;

  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id_speciality: number;
}

@ObjectType()
export class AddProjectSpecialityOutput {
  @Field()
  @IsString()
  readonly project: string;

  @Field()
  @IsString()
  readonly speciality: string;
}

@ObjectType()
export class findProjBySpecIdOutput {
  @Field()
  @IsString()
  readonly project: string;

  @Field()
  @IsString()
  readonly description: string;

  @Field()
  @IsString()
  readonly status: string;

  @Field()
  @IsString()
  readonly speciality: string;
}
