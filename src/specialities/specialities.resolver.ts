import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  SpecialitiesDto,
  GetOneSpecialityInput,
  CreateSpecialityInput,
  UpdateSpecialityInput,
  DeleteSpecialityInput,
} from './dto/specialities.dto';
import { SpecialitiesService } from './specialities.service';

@Resolver()
export class SpecialitiesResolver {
  constructor(private specialitiesService: SpecialitiesService) {}

  @Query(() => [SpecialitiesDto])
  async getAllSpecialites() {
    return this.specialitiesService.findAll();
  }

  @Query(() => SpecialitiesDto)
  async getSpecialityById(@Args('input') input: GetOneSpecialityInput) {
    return this.specialitiesService.findOne(input.id);
  }

  @Mutation(() => SpecialitiesDto)
  async createSpeciality(@Args('input') input: CreateSpecialityInput) {
    return this.specialitiesService.create(input);
  }

  @Mutation(() => SpecialitiesDto)
  async updateProject(@Args('input') input: UpdateSpecialityInput) {
    return this.specialitiesService.update(input);
  }

  @Mutation(() => SpecialitiesDto)
  async DeleteProject(@Args('input') input: DeleteSpecialityInput) {
    return this.specialitiesService.remove(input.id);
  }
}
