import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import {
  CreateDeveloperInput,
  UpdateDeveloperInput,
  AddDeveloperSpecialityInput,
} from './dto/developers.dto';

@Injectable()
export class DevelopersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    const developers = await this.knex.table('developers');
    if (!developers) {
      throw new NotFoundException(`developers not found`);
    }
    return developers;
  }

  async findOne(id: number) {
    const query = `SELECT * from developers where id = ?`;
    const developer = await this.knex.raw(query, [id]);
    console.log(developer.rows[0]);
    if (!developer || developer.rows[0] === undefined) {
      throw new NotFoundException(`Developer with id ${id} not found`);
    }
    return developer.rows[0];
  }

  async create(data: CreateDeveloperInput) {
    const { name, email } = data;
    const insert = await this.knex('developers')
      .insert({
        name,
        email,
      })
      .returning('id')
      .then((report) => {
        return this.findOne(+report[0].id);
      })
      .catch((err) => {
        console.log('Error registering Developer', err);
        throw new BadRequestException(
          `Error registering Developer: ${err.detail}`,
        );
      });

    return insert;
  }

  async update(changes: UpdateDeveloperInput) {
    const queryDev = `SELECT * FROM developers WHERE id = ?`;
    const dataDev = await this.knex.raw(queryDev, [changes.id]);
    const actualDataDev = dataDev.rows[0];
    if (actualDataDev === undefined) {
      throw new NotFoundException(`Developer with id ${changes.id} not found`);
    }

    const newDataRcords = {
      ...actualDataDev,
      ...changes,
    };

    const query = `UPDATE public.developers SET name=?, email=? WHERE id = ?`;

    await this.knex
      .raw(query, [newDataRcords.name, newDataRcords.email, newDataRcords.id])
      .then((report) => {
        console.log(report);
      })
      .catch((err) => {
        console.log('Error updating Developer', err);
        throw new BadRequestException(
          `Error updating Developer: ${err.detail}`,
        );
      });

    return newDataRcords;
  }

  async findDevsBySpecialityId(id: number) {
    const query = `SELECT d."name" as "developer" , d.email as "email" , s."name" as "speciality" 
    FROM public.developer_has_specialities dhs  
      JOIN public.developers d  ON dhs.id_developer = d.id 
      join public.specialities s ON s.id = dhs.id_speciality 
      where s.id = ?`;
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

  async findDevsByProjectId(id: number) {
    const query = `SELECT d."name" as "developer", d.email as "email", s."name" as "speciality", p."name" as "project_associated"
    FROM public.projects_has_developers phd  
      JOIN public.developers d  ON phd.developer_id  = d.id 
      join public.projects p ON p.id = phd.project_id 
      join public.status_projects sp on sp.id = p.id_status 
      join public.developer_has_specialities dhs on d.id = dhs.id_developer 
      join public.specialities s on dhs.id_speciality = s.id 
      where p.id = ?
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

  async findDevSpecId(id: number) {
    const query = `SELECT d."name" as "developer" , d.email as "email" , s."name" as "speciality" 
    FROM public.developer_has_specialities dhs  
      JOIN public.developers d  ON dhs.id_developer = d.id 
      join public.specialities s ON s.id = dhs.id_speciality 
      where dhs.id = ?`;
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

  async AddDeveloperSpeciality(data: AddDeveloperSpecialityInput) {
    const { id_developer, id_speciality } = data;
    const queryDev = `SELECT * FROM developer_has_specialities WHERE id_developer = ? AND id_speciality = ?`;
    const dataDev = await this.knex.raw(queryDev, [
      id_developer,
      id_speciality,
    ]);
    const actualDataDev = dataDev.rows[0];
    if (actualDataDev !== undefined) {
      throw new BadRequestException(
        `Relation developer-speciality already exist`,
      );
    }

    const insert = await this.knex('developer_has_specialities')
      .insert({
        id_developer,
        id_speciality,
      })
      .returning('id')
      .then((report) => {
        console.log('salida_insert', report);
        return this.findDevSpecId(+report[0].id);
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
