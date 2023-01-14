import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import {
  CreateProjectInput,
  UpdateProjectInput,
  AddProjectSpecialityInput,
  AddProjectDeveloperInput,
} from './dto/projects.dto';

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

  async update(changes: UpdateProjectInput) {
    const queryProj = `SELECT * FROM projects WHERE id = ?`;
    const dataProj = await this.knex.raw(queryProj, [changes.id]);
    const actualDataProj = dataProj.rows[0];
    if (actualDataProj === undefined) {
      throw new NotFoundException(`Speciality with id ${changes.id} not found`);
    }

    const newDataProj = {
      ...actualDataProj,
      ...changes,
    };

    const query = `UPDATE public.projects SET name=?, description = ?, id_status = ? WHERE id = ?`;

    await this.knex
      .raw(query, [
        newDataProj.name,
        newDataProj.description,
        newDataProj.id_status,
        newDataProj.id,
      ])
      .then(async (report) => {
        console.log(report);
      })
      .catch((err) => {
        console.log('Error updating Speciality', err);
        throw new BadRequestException(
          `Error updating Speciality: ${err.detail}`,
        );
      });

    return newDataProj;
  }

  async findProjSpecId(id: number) {
    const query = `SELECT p."name" as "project", s."name" as "speciality" 
    FROM public.projects_need_specialities pns 
      JOIN public.projects p ON pns.id_project = p.id 
      join public.specialities s ON s.id = pns.id_speciality 
      where pns.id = ?`;
    const result = await this.knex
      .raw(query, [id])
      .then((report) => {
        console.log(report.rows);
        return report.rows[0];
      })
      .catch((err) => {
        console.log('Error getting Projects', err);
        throw new BadRequestException(`Error getting Projects : ${err.detail}`);
      });

    return result;
  }

  async AddProjectSpeciality(data: AddProjectSpecialityInput) {
    const { id_project, id_speciality } = data;
    const queryPr = `SELECT * FROM projects_need_specialities WHERE id_project = ? AND id_speciality = ?`;
    const dataPr = await this.knex.raw(queryPr, [id_project, id_speciality]);
    const actualDataDev = dataPr.rows[0];
    if (actualDataDev !== undefined) {
      throw new BadRequestException(
        `Relation developer-speciality already exist`,
      );
    }

    const insert = await this.knex('projects_need_specialities')
      .insert({
        id_project,
        id_speciality,
      })
      .returning('id')
      .then((report) => {
        console.log('salida_insert', report);
        return this.findProjSpecId(+report[0].id);
      })
      .catch((err) => {
        console.log('Error registering relation developer-speciality', err);
        throw new BadRequestException(
          `Error registering relation developer-speciality: ${err.detail}`,
        );
      });

    return insert;
  }

  async findProjBySpecId(id: number) {
    const query = `SELECT p."name" as "project", p.description as "description", sp."name" as status, s."name" "speciality"
    FROM public.projects_need_specialities pns  
      join public.projects p ON p.id = pns.id_project 
      join public.status_projects sp on sp.id = p.id_status 
      join public.specialities s on pns.id_speciality = s.id 
      where s.id = ?
    `;
    const result = await this.knex
      .raw(query, [id])
      .then((report) => {
        console.log(report.rows);
        return report.rows;
      })
      .catch((err) => {
        console.log('Error getting Projects', err);
        throw new BadRequestException(`Error getting Projects : ${err.detail}`);
      });

    return result;
  }

  async findProjByStatusId(id: number) {
    const query = `SELECT p."name" as "project", p.description as "description", sp."name" as status, s."name" "speciality"
    FROM public.projects_need_specialities pns  
      join public.projects p ON p.id = pns.id_project 
      join public.status_projects sp on sp.id = p.id_status 
      join public.specialities s on pns.id_speciality = s.id 
      where p.id_status = ?
    `;
    const result = await this.knex
      .raw(query, [id])
      .then((report) => {
        console.log(report.rows);
        return report.rows;
      })
      .catch((err) => {
        console.log('Error getting Projects', err);
        throw new BadRequestException(`Error getting Projects : ${err.detail}`);
      });

    return result;
  }

  async findProjDevId(id: number) {
    const query = `select p."name" as project, d."name" as developer
    from public.projects_has_developers phd 
    join public.developers d on d.id = phd.developer_id 
    join public.projects p on p.id = phd.project_id 
    where phd.id = ? limit 1`;
    const result = await this.knex
      .raw(query, [id])
      .then((report) => {
        console.log(report.rows);
        return report.rows[0];
      })
      .catch((err) => {
        console.log('Error getting Projects', err);
        throw new BadRequestException(`Error getting Projects : ${err.detail}`);
      });

    return result;
  }

  async AddProjectDeveloper(data: AddProjectDeveloperInput) {
    const { project_id, developer_id } = data;
    const queryPr = `
      with query_projects as (
      select p.id id_project, pns.id_speciality id_speciality_needed from public.projects p join public.projects_need_specialities pns on p.id = pns.id_project where p.id = ?
    ), query_developers as (
      select d."name" developer, dhs.id_speciality id_speciality_offer from public.developers d join public.developer_has_specialities dhs on d.id = dhs.id_developer where d.id = ?
    ) select * from query_projects where id_speciality_needed IN (select id_speciality_offer from query_developers)`;
    const dataPr = await this.knex.raw(queryPr, [project_id, developer_id]);
    const actualDataDev = dataPr.rows[0];
    console.log('consulta_dev_proj', actualDataDev);
    if (actualDataDev === undefined) {
      throw new BadRequestException(
        `The developer does not have the necessary specialties`,
      );
    }

    const insert = await this.knex('projects_has_developers')
      .insert({
        project_id,
        developer_id,
      })
      .returning('id')
      .then((report) => {
        console.log('salida_insert', report);
        return this.findProjSpecId(+report[0].id);
      })
      .catch((err) => {
        console.log('Error registering relation developer-speciality', err);
        throw new BadRequestException(
          `Error registering relation developer-speciality: ${err.detail}`,
        );
      });

    return insert;
  }
}
