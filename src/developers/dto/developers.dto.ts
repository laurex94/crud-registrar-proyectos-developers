import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetDeveloperDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Field()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Field()
  readonly name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of developer' })
  @Field()
  readonly email: string;
}

export class CreateDeveloperDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Field()
  readonly name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of developer' })
  @Field()
  readonly email: string;
}

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {}
