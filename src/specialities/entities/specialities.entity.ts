export enum listRoles {
  UIUX = 'UI/UX Designer',
  webDesigner = 'Web Designer',
  frontend = 'Frontend Developer',
  backend = 'Backend Developer',
  DBA = 'Database Administrator',
  cloud = 'Cloud Architect',
  QA = 'Quality Assurancer',
  marketing = 'Digital Marketing Specialist',
  contentCreator = 'Content Creator',
  projectManager = 'Project Manager',
  productOwner = 'Product Owner',
  software = 'Software Architect',
}

export class Speciality {
  id: number;
  name: listRoles;
}
