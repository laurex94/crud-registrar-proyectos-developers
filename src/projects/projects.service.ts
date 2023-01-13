import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { CreateProjectInput, UpdateProjectInput } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    const query = `SELECT p.id AS id, p.name AS name, p.description AS description, sp.name AS status
    FROM public.projects p 
      JOIN public.status_projects sp ON p.id_status = sp.id `;
    const projects = await this.knex
      .raw(query)
      .then((report) => {
        console.log(report.rows);
        return report.rows;
      })
      .catch((err) => {
        console.log('Error getting Projects', err);
        throw new BadRequestException(`Error getting Projects : ${err.detail}`);
      });

    return projects;
  }

  async findOne(id: number) {
    const query = `SELECT p.id AS id, p.name AS name, p.description AS description, sp.name AS status
    FROM public.projects p 
      JOIN public.status_projects sp ON p.id_status = sp.id 
    WHERE p.id = ?`;
    const projects = await this.knex
      .raw(query, [id])
      .then((report) => {
        console.log(report.rows);
        return report.rows[0];
      })
      .catch((err) => {
        console.log('Error getting Projects', err);
        throw new BadRequestException(`Error getting Projects : ${err.detail}`);
      });

    return projects;
  }

  async create(data: CreateProjectInput) {
    const { name, description, id_status } = data;
    const insert = await this.knex('projects')
      .insert({
        name,
        description,
        id_status,
      })
      .returning('id')
      .then((report) => {
        return this.findOne(+report[0].id);
      })
      .catch((err) => {
        console.log('Error registering Project', err);
        throw new BadRequestException(
          `Error registering Project: ${err.detail}`,
        );
      });

    return insert;
  }

  // async update(changes: UpdateProjectInput) {
  //   const project = this.findOne(changes.id);
  //   const index = this.projects.findIndex((data) => data.id === changes.id);
  //   this.projects[index] = {
  //     ...project,
  //     ...changes,
  //   };
  //   return this.projects[index];
  // }

  // async remove(id: number) {
  //   const project = this.findOne(id);
  //   const index = this.projects.findIndex((data) => data.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Developer #${id} not found`);
  //   }
  //   this.projects.splice(index, 1);
  //   return project;
  // }
}
