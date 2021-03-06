import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Connect Mongoose DB
import { NoticeModule } from './notice/notice.module'; // Notice Module
import { RecruitModule } from './recruit/recruit.module'; // Recruit Module
import { UserModule } from './user/user.module'; // User Module
import { ProjectModule } from './project/project.module'; // Project Module
import { ReviewModule } from './review/review.module'; // Review Module

/* imports the Modules And Connected the Controllers */
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ds_db'),
    NoticeModule,
    RecruitModule,
    UserModule,
    ProjectModule,
    ReviewModule,
  ],
})
export class AppModule {}
