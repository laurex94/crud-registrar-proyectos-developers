import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, statusProject } from './entities/projects.entity';

import { CreateProjectInput, UpdateProjectInput } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
  private counterId = 1;
  private projects: Project[] = [
    {
      id: 1,
      name: 'Proyecto 1',
      description: 'Descripcion proyecto 1',
      status: statusProject.available,
    },
  ];

  async findAll() {
    const projects = this.projects;
    if (!projects) {
      throw new NotFoundException(`Developers not found`);
    }
    return projects;
  }

  async findOne(id: number) {
    const project = this.projects.find((data) => data.id === id);
    if (!project) {
      throw new NotFoundException(`Developer #${id} not found`);
    }
    return project;
  }

  async create(data: CreateProjectInput) {
    this.counterId = this.counterId + 1;
    const newProject = {
      id: this.counterId,
      ...data,
    };
    this.projects.push(newProject);
    return newProject;
  }

  async update(changes: UpdateProjectInput) {
    const project = this.findOne(changes.id);
    const index = this.projects.findIndex((data) => data.id === changes.id);
    this.projects[index] = {
      ...project,
      ...changes,
    };
    return this.projects[index];
  }

  async remove(id: number) {
    const project = this.findOne(id);
    const index = this.projects.findIndex((data) => data.id === id);
    if (index === -1) {
      throw new NotFoundException(`Developer #${id} not found`);
    }
    this.projects.splice(index, 1);
    return project;
  }
}
