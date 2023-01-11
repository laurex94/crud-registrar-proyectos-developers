import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Field } from '@nestjs/graphql';

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
