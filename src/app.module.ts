import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { DevelopersModule } from './developers/developers.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { KnexModule } from 'nest-knexjs';
import { config } from 'dotenv';
const result = config();

if (result.error) {
  console.log(result.error);
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      plugins: [],
    }),
    ProjectsModule,
    DevelopersModule,
    SpecialitiesModule,
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'pg',
          version: '5.7',
          connection: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            insecureAuth: true,
          },
          pool: {
            min: 2,
            max: 10,
          },
          migrations: {
            directory: './migrations',
            tableName: 'migrations',
          },
          seeds: {
            directory: './seeds',
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
