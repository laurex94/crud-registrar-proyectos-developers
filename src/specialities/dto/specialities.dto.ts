import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { listRoles } from '../entities/specialities.entity';

@ObjectType()
export class SpecialitiesDto {
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
  readonly name: listRoles;
}

@InputType()
export class UpdateSpecialityInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  @Field()
  @IsString()
  readonly name: listRoles;
}

@InputType()
export class DeleteSpecialityInput {
  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;
}
