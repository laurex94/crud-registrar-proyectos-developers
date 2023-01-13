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
