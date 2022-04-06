import { ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'node:path';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
    StudentModule,
    CourseModule,
    EnrollmentModule,
    MessagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
