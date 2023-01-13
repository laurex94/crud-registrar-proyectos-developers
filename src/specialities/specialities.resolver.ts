import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  GetSpecialityDto,
  GetOneSpecialityInput,
  CreateSpecialityInput,
  UpdateSpecialityInput,
} from './dto/specialities.dto';
import { SpecialitiesService } from './specialities.service';

@Resolver()
export class SpecialitiesResolver {
  constructor(private specialitiesService: SpecialitiesService) {}

  @Query(() => [GetSpecialityDto])
  async getAllSpecialites() {
    return this.specialitiesService.findAll();
  }

  @Query(() => GetSpecialityDto)
  async getSpecialityById(@Args('input') input: GetOneSpecialityInput) {
    return await this.specialitiesService.findOne(input.id);
  }

  @Mutation(() => GetSpecialityDto)
  async createSpeciality(@Args('input') input: CreateSpecialityInput) {
    return await this.specialitiesService.create(input);
  }

  @Mutation(() => GetSpecialityDto)
  async updateSpeciality(@Args('input') input: UpdateSpecialityInput) {
    return await this.specialitiesService.update(input);
  }
}
