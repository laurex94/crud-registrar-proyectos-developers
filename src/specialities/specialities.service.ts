import { Injectable, NotFoundException } from '@nestjs/common';
import { Speciality, listRoles } from './entities/specialities.entity';

import {
  CreateSpecialityInput,
  UpdateSpecialityInput,
} from './dto/specialities.dto';

@Injectable()
export class SpecialitiesService {
  private counterId = 1;
  private roles: Speciality[] = [
    {
      id: 1,
      name: listRoles.backend,
    },
  ];

  async findAll() {
    const roles = this.roles;
    if (!roles) {
      throw new NotFoundException(`Speciality not found`);
    }
    return roles;
  }

  async findOne(id: number) {
    const rol = this.roles.find((data) => data.id === id);
    if (!rol) {
      throw new NotFoundException(`Speciality #${id} not found`);
    }
    return rol;
  }

  async create(data: CreateSpecialityInput) {
    this.counterId = this.counterId + 1;
    const newRol = {
      id: this.counterId,
      ...data,
    };
    this.roles.push(newRol);
    return newRol;
  }

  async update(changes: UpdateSpecialityInput) {
    const rol = this.findOne(changes.id);
    const index = this.roles.findIndex((data) => data.id === changes.id);
    this.roles[index] = {
      ...rol,
      ...changes,
    };
    return this.roles[index];
  }

  async remove(id: number) {
    const rol = this.findOne(id);
    const index = this.roles.findIndex((data) => data.id === id);
    if (index === -1) {
      throw new NotFoundException(`Speciality #${id} not found`);
    }
    this.roles.splice(index, 1);
    return rol;
  }
}
