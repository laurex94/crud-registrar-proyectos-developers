import { Speciality } from 'src/specialities/entities/specialities.entity';
import { Project } from '../../projects/entities/projects.entity';

export class Developer {
  id: number;
  name: string;
  email: string;
  projects: Project[];
  roles: Speciality[];
}
