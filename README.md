

# CRUD DEVELOPER-PROJECT
## Descripción

Crea un CRUD en Typescript con GraphQL y NestJS que contenga los siguientes modelos y relaciones:

- Proyecto: ID, nombre, descripción, status (Enum), tiene muchos devs, requiere ciertos Roles.
- Developer: ID, nombre, email, puede trabajar en varios proyectos, tiene varios Roles
- Especialidad: ID, Nombre

## Funcionamiento:

- El sistema debe validar los datos ingresados: Emails, textos en blanco, etc.
- El usuario va a poder registrar distintas especialidades: Frontend, , Cloud Arquitech, UI, Tester, etc.
- El usuario va a poder registrar varios proyectos.
- El usuario va a poder relacionar varios devs a un proyecto, el sistema debe arrojar un error si el dev no tiene alguno de los roles requerido por el proyecto. Ej: Proyecto de Diseño de interfaces, tiene los roles Frontend y UI, un dev con el rol backend no puede ingresar al proyecto.
- El usuario va a poder listar proyectos, pudiendo filtrar a su vez por Roles dentro del proyecto y por status. Ej: todos los proyectos que requieran el rol UI.
- El usuario va a poder listar Devs, también pudiendo filtrar por Rol y además por proyecto.

## Instalación

```bash
$ npm install
```

## Corriendo la App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Queries

```bash
# Obtener lista de desarroladores
query {
  getAllDevelopers {
    id
    name
    email
  }
}

# Obtener datos de desarrollador por id
query{
  getDeveloperById(input:{id:1}){
    name
  }
}

# Registrar desarrollador
mutation{
  createDeveloper(input:{name:"perensejo7",email:"perensejo7@gmail.com"}) {
    id
    name
    email
  }
}

# Actualizar datos de desarrollador
mutation{
  updateDeveloper(input:{id:5, name:"perensejo11",email:"perensejo1194@gmail.com"}) {
    id
    name
    email
  }
}

# Añadir relacion desarrollador-rol
mutation{
  AddDeveloperSpeciality(input:{id_developer:1, id_speciality:9}) {
	developer
    email
    speciality
  }
}

# Obtener lista de desarrolladores por id de proyecto
query{
  findDevsByProjectId(input:{id:1}){
    developer
  	email
    speciality
    project_associated
  }
}

# Obtener lista de desarrolladores por id rol
query{
  findDevsBySpecialityId(input:{id:7}){
    developer
  	email
    speciality
  }
}

# Listar roles
query {
  getAllSpecialites {
    id
    name
  }
}

# Obtener rol por id
query{
  getSpecialityById(input:{id:1}){
    name
  }
}

# Registrar rol
mutation{
  createSpeciality(input:{name:"Backend"}) {
    id
    name
  }
}

# Actualizar datos de rol ya creado
mutation{
  updateSpeciality(input:{id:5, name:"perensejo11"}) {
    id
    name
    email
  }
}

# Listar proyectos
query {
  getAllProjects {
    id
    name
    status
  }
}

# Obtener proyecto por id
query{
  getProjectById(input:{id:1}){
    id
    name
    description
  }
}

# registrar proyecto
mutation{
  createProject(input:{name:"Proyecto 1", description:"descripcion 1", id_status: 1}) {
    id
    name
  }
}

# Actualizar datos de proyecto
mutation{
  updateProject(input:{id:3, name:"proyecto 2"}) {
    id
    name
  }
}

# Añadir roles necesarios a proyecto
mutation{
  AddProjectSpeciality(input:{id_project:1, id_speciality:8}) {
		project
    speciality
  }
}

# Buscar proyectos por rol
query{
  findProjBySpecId(input:{id:7}){
    project
  	description
    status
    speciality
  }
}

# Buscar proyecto por estatus
query{
  findProjByStatusId(input:{id:1}){
    project
  	description
    status
    speciality
  }
}

# Añadir desarrollador a proyecto
mutation{
  AddProjectDeveloper(input:{project_id:1, developer_id:2}) {
		project
    developer
  }
}

```