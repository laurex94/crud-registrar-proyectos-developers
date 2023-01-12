import { Injectable, NotFoundException } from '@nestjs/common';
import { Developer } from './entities/developers.entity';

import {
  CreateDeveloperInput,
  UpdateDeveloperInput,
} from './dto/developers.dto';

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
    const developer = this.developers.find((data) => data.id === id);
    if (!developer) {
      throw new NotFoundException(`Developer #${id} not found`);
    }
    return developer;
  }

  create(data: CreateDeveloperInput) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.developers.push(newUser);
    return newUser;
  }

  update(changes: UpdateDeveloperInput) {
    const developer = this.findOne(changes.id);
    const index = this.developers.findIndex((data) => data.id === changes.id);
    this.developers[index] = {
      ...developer,
      ...changes,
    };
    return this.developers[index];
  }

  remove(id: number) {
    const developer = this.findOne(id);
    const index = this.developers.findIndex((data) => data.id === id);
    if (index === -1) {
      throw new NotFoundException(`Developer #${id} not found`);
    }
    this.developers.splice(index, 1);
    return developer;
  }
}
