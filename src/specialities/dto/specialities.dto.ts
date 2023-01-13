import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetSpecialityDto {
  @Field()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Field()
  @IsString()
  readonly name: string;
}

@InputType()
export class GetOneSpecialityInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
}

@InputType()
export class CreateSpecialityInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

@InputType()
export class UpdateSpecialityInput {
  @Field()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly name: string;
}
