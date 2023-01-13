import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetDeveloperDto {
  @Field()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  @IsEmail()
  readonly email: string;
}

@InputType()
export class GetOneDeveloperInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
}

@InputType()
export class CreateDeveloperInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsString()
  @IsEmail()
  readonly email: string;
}

@InputType()
export class UpdateDeveloperInput {
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
  readonly email: string;
}

@InputType()
export class AddDeveloperSpecialityInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id_developer: number;

  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id_speciality: number;
}

@ObjectType()
export class AddDeveloperSpecialityOutput {
  @Field()
  @IsString()
  readonly developer: string;

  @Field()
  @IsString()
  readonly email: string;

  @Field()
  @IsString()
  readonly speciality: string;
}

@ObjectType()
export class findDevsByProjectIdOutput {
  @Field()
  @IsString()
  readonly developer: string;

  @Field()
  @IsString()
  readonly email: string;

  @Field()
  @IsString()
  readonly speciality: string;

  @Field()
  @IsString()
  readonly project_associated: string;
}
