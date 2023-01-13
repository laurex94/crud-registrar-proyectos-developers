import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { Speciality, listRoles } from './entities/specialities.entity';
import {
  CreateSpecialityInput,
  UpdateSpecialityInput,
} from './dto/specialities.dto';
import { Console } from 'console';

@Injectable()
export class SpecialitiesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  private counterId = 1;
  private roles: Speciality[] = [
    {
      id: 1,
      name: listRoles.backend,
    },
  ];

  async findAll() {
    const specialities = await this.knex.table('specialities');
    console.log(specialities);
    if (!specialities) {
      throw new NotFoundException(`specialities not found`);
    }
    return specialities;
  }

  async findOne(id: number) {
    const query = `SELECT * from specialities where id = ?`;
    const speciality = await this.knex.raw(query, [id]);
    console.log(speciality.rows[0]);
    if (!speciality || speciality.rows[0] === undefined) {
      throw new NotFoundException(`Speciality with id ${id} not found`);
    }
    return speciality.rows[0];
  }

  async create(data: CreateSpecialityInput) {
    const { name } = data;
    const insert = await this.knex('specialities')
      .insert({
        name,
      })
      .returning('id')
      .then((report) => {
        return this.findOne(+report[0].id);
      })
      .catch((err) => {
        console.log('Error registering Speciality', err);
        throw new BadRequestException(
          `Error registering Speciality: ${err.detail}`,
        );
      });

    return insert;
  }

  async update(changes: UpdateSpecialityInput) {
    const querySpec = `SELECT * FROM specialities WHERE id = ?`;
    const dataSpec = await this.knex.raw(querySpec, [changes.id]);
    const actualDataSpec = dataSpec.rows[0];
    if (actualDataSpec === undefined) {
      throw new NotFoundException(`Speciality with id ${changes.id} not found`);
    }

    const newDataSpec = {
      ...actualDataSpec,
      ...changes,
    };

    const query = `UPDATE public.specialities SET name=? WHERE id = ?`;

    await this.knex
      .raw(query, [newDataSpec.name, newDataSpec.id])
      .then(async (report) => {
        console.log(report);
      })
      .catch((err) => {
        console.log('Error updating Speciality', err);
        throw new BadRequestException(
          `Error updating Speciality: ${err.detail}`,
        );
      });

    return newDataSpec;
  }
}
