import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Developer } from './entities/developers.entity';

import { CreateDeveloperDto, UpdateDeveloperDto } from './dto/developers.dto';
import { statusProject } from 'src/projects/entities/projects.entity';

@Injectable()
export class DevelopersService {
  private counterId = 1;
  private developers: Developer[] = [
    {
      id: 1,
      name: 'Laurence Marcano',
      projects: [
        {
          id: 1,
          name: 'Netflix',
          description: 'Proyecto netflix',
          status: statusProject.available,
        },
      ],
      email: 'laurencejose94@gmail.com',
      roles: [
        {
          id: 1,
          name: 'backend',
        },
      ],
    },
  ];
}
