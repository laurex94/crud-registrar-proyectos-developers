export enum statusProject {
  available = 'available',
  progress = 'progress',
  closed = 'closed',
}

export class Project {
  id: number;
  name: string;
  description: string;
  status: statusProject;
}
