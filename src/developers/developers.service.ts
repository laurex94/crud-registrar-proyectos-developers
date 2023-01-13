import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Developer } from './entities/developers.entity';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import {
  CreateDeveloperInput,
  UpdateDeveloperInput,
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
    if (!developer) {
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
        return this.findOne(newDataRcords.id);
      })
      .catch((err) => {
        console.log('Error updating Developer', err);
        throw new BadRequestException(
          `Error updating Developer: ${err.detail}`,
        );
      });
  }
}
