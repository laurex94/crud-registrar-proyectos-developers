import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Developer } from './entities/developers.entity';

import {
  CreateDeveloperDto,
  GetDeveloperDto,
  UpdateDeveloperDto,
} from './dto/developers.dto';
import { statusProject } from 'src/projects/entities/projects.entity';

@Injectable()
export class DevelopersService {
  private counterId = 1;
  private developers: Developer[] = [
    {
      id: 1,
      name: 'Laurence Marcano',
      email: 'laurencejose94@gmail.com',
    },
  ];

  async findAll() {
    const developers = this.developers;
    if (!developers) {
      throw new NotFoundException(`Developers not found`);
    }
    return developers;
  }

  findOne(id: number) {
    const developer = this.developers.find((item) => item.id === id);
    if (!developer) {
      throw new NotFoundException(`Developer #${id} not found`);
    }
    return developer;
  }

  create(data: CreateDeveloperDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.developers.push(newUser);
    return newUser;
  }
}
