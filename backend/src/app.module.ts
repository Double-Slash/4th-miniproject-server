import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Connect Mongoose DB
import { NoticeModule } from './notice/notice.module'; // Notice Module

/* imports the Modules And Connected the Controllers */
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ds_db'),
    NoticeModule,
  ],
})
export class AppModule {}
